import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/empty-view.js';
import {render} from '../render.js';
import { generateSort } from '../fish/sort.js';
import PointPresenter from './route-point-presenter.js';
import { RenderPosition } from '../framework/render.js';

export default class EventsPresenter {
  #container = null;
  #pointsModel = null;

  #tripListComponent = new TripEventsListView();
  #listEmptyComponent = new EmptyView();

  #points = [];
  #pointPresenter = new Map();

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #updateItem = (items, update) => {
    const index = items.findIndex((item) => item.id === update.id);

    if (index === -1) {
      return items;
    }

    return [
      ...items.slice(0, index),
      update,
      ...items.slice(index + 1),
    ];
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = this.#updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort = () => {
    render(new SortView(generateSort()), this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = () => {
    render(this.#tripListComponent, this.#container);
  };

  #renderListEmpty = () => {
    render(this.#listEmptyComponent, this.#tripListComponent.element);
  };

  init = (container, pointsModel) => {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#points = [...this.#pointsModel.points];

    if(this.#points.length > 0) {
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]);
      }
    } else {
      this.#renderListEmpty();
    }

    this.#renderSort();
    this.#renderPoints();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

}
