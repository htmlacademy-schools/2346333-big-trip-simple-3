import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/point-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/empty-view.js';
import {render} from '../render.js';

export default class EventsPresenter {
  #container;
  #pointsModel;
  #tripList = new TripEventsListView();
  #sortView = new SortView();
  #points = [];

  init = (container, pointsModel) => {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#points = [...this.#pointsModel.points];

    render(this.#sortView, this.#container);
    render(this.#tripList, this.#container);

    if(this.#points.length > 0) {
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]);
      }
    } else {
      render(new EmptyView(), this.#tripList.element);
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new EventView(point);
    const pointEditComponent = new EventEditView(point);

    const replaceCardToForm = () => {
      this.#tripList.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToCard = () => {
      this.#tripList.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const openEditForm = () => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    };

    const closeEditForm = () => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    const handleSubmitEvent = (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click',openEditForm);
    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', closeEditForm);
    pointEditComponent.element.querySelector('form').addEventListener('submit', handleSubmitEvent);

    render(pointComponent, this.#tripList.element);
  };
}
