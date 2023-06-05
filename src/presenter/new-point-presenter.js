import {remove, render, RenderPosition} from '../framework/render.js';
import {UserActions, UpdateType, DEFAULT_POINT} from '../const.js';
import EventEditView from '../view/event-edit-view.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointFormComponent = null;

  #point = null;
  #pointsModel = null;

  constructor(pointListContainer, pointsModel, onDataChange) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;

    this.getOffersByType = this.#pointsModel.getOffersByType;
    this.getOfferTypes = this.#pointsModel.getOfferTypes;
    this.getAllOffersList = this.#pointsModel.getAllOffersList;

    this.getDestination = this.#pointsModel.getDestination;
    this.getAllDestinationNames = this.#pointsModel.getAllDestinationNames;
  }

  init = (callback) => {
    this.#handleDestroy = callback;

    if (this.#pointFormComponent !== null) {
      return;
    }

    this.#pointFormComponent = new EventEditView(
      this.#point = DEFAULT_POINT,
      this.getOffersByType,
      this.getDestination,
      this.getAllDestinationNames,
      this.getOfferTypes,
      this.getAllOffersList,
    );

    this.#pointFormComponent.setFormSubmitHandler ((point) => {
      this.#handleDataChange(
        UserActions.ADD_POINT,
        UpdateType.MINOR,
        point,
      );
    });

    this.#pointFormComponent.setDeleteClickHandler(() => {
      this.destroy();
    });

    render(this.#pointFormComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointFormComponent);
    this.#pointFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#pointFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#pointFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointFormComponent.shake(resetFormState);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointFormComponent.reset(this.#point);
      this.destroy();
    }
  };
}
