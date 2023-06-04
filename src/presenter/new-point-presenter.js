import {render, RenderPosition} from '../framework/render.js';
import ListEmptyView from '../view/empty-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../util/common.js';
import {SORT_TYPES} from '../const.js';
import {sortPointDay, sortPointPrice} from '../util/point.js';

export default class NewPointPresenter {
  #eventsContainer = null;
  #pointsModel = null;

  #tripListComponent = new TripEventsListView();
  #listEmptyComponent = new ListEmptyView();
  #sortComponent = new SortView();

  #points = [];
  #pointPresenter = new Map();
  #currentSortType = null;
  #sourcedPoints = [];

  constructor(eventsContainer, pointsModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoints = () => {
    this.#points.forEach(this.#renderPoint);
  };

  #renderListEmpty = () => {
    render(this.#listEmptyComponent, this.#tripListComponent.element);
  };

  init = () => {
    render(this.#tripListComponent, this.#eventsContainer);
    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];
    this.getOffersByType = this.#pointsModel.getOffersByType;

    this.#renderPoints();
    this.#renderSort();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SORT_TYPES.DAY:
        this.#points.sort(sortPointDay);
        break;
      case SORT_TYPES.PRICE:
        this.#points.sort(sortPointPrice);
        break;
      default:
        this.points = [...this.sourcedPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderPointList = () => {
    if (this.#points.length === 0) {
      this.#renderListEmpty();
    }
    this.#renderPoints();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#pointsModel, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
