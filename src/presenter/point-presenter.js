import {render, replace, remove} from '../framework/render.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import {UPDATE_TYPES, USER_ACTIONS} from '../const.js';
import {isDatesEqual, isPriceEqual} from '../util/point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #pointsModel = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, pointsModel, onDataChange, onModeChange) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#pointsModel = pointsModel;
    this.getOffersByType = this.#pointsModel.getOffersByType;
    this.getDestination = this.#pointsModel.getDestination;
    this.getAllDestinationNames = this.#pointsModel.getAllDestinationNames;
    this.getOfferTypes = this.#pointsModel.getOfferTypes;
    this.getAllOffersList = this.#pointsModel.getAllOffersList;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventView(this.#point);
    this.#pointEditComponent = new EventEditView(this.#point, this.getOffersByType, this.getDestination, this.getAllDestinationNames, this.getOfferTypes, this.getAllOffersList);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setEditClickHandler(this.#handleClick);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (point) => {
    const isMinorUpdate =
      !isDatesEqual(this.#point, point) ||
      !isPriceEqual(this.#point, point);

    this.#handleDataChange(
      USER_ACTIONS.UPDATE_POINT,
      isMinorUpdate ? UPDATE_TYPES.MINOR : UPDATE_TYPES.PATCH,
      point,
    );
    this.#replaceFormToCard();
  };

  #handleClick = () => {
    this.resetView();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      USER_ACTIONS.DELETE_POINT,
      UPDATE_TYPES.MINOR,
      point,
    );
  };
}
