import {render, remove,RenderPosition} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ListEmptyView from '../view/empty-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {SORT_TYPES, UPDATE_TYPES, FILTER_TYPES, USER_ACTIONS} from '../const.js';
import {sortPointDay, sortPointPrice} from '../util/point.js';
import LoadingView from '../view/load-view.js';
import {filter} from '../util/filter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class PagePresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #tripListComponent = new TripEventsListView();
  #listEmptyComponent = new ListEmptyView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;

  #pointPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = SORT_TYPES.DAY;
  #filterType = FILTER_TYPES.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(eventsContainer, pointsModel, filterModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter(this.#tripListComponent.element, this.#pointsModel, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SORT_TYPES.DAY:
        return filteredPoints.sort(sortPointDay);
      case SORT_TYPES.PRICE:
        return filteredPoints.sort(sortPointPrice);
    }

    return filteredPoints;
  }

  init = () => {
    render(this.#tripListComponent, this.#eventsContainer);
    this.#renderPointsList();
  };

  createPoint = (callback) => {
    this.#currentSortType = SORT_TYPES.DEFAULT;
    this.#filterModel.setFilter(UPDATE_TYPES.MAJOR, FILTER_TYPES.EVERYTHING);
    this.#newPointPresenter.init(callback, this.#pointsModel.offers, this.#pointsModel.destinations);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#tripListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case USER_ACTIONS.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case USER_ACTIONS.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case USER_ACTIONS.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPES.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UPDATE_TYPES.MINOR:
        this.#clearPointsList();
        this.#renderPointsList();
        break;
      case UPDATE_TYPES.MAJOR:
        this.#clearPointsList({ resetSortType: true });
        this.#renderPointsList();
        break;
      case UPDATE_TYPES.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointsList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderListEmpty = () => {
    render(this.#listEmptyComponent, this.#tripListComponent.element);
  };

  #renderPointsList = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;

    if (!points.length) {
      this.#renderListEmpty();
    }
    this.#renderSort();
    this.#renderPoints(points);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent.element, this.#pointsModel, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#pointsModel.offers, this.#pointsModel.destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointsList = ({ resetSortType = false } = {}) => {
    this.#newPointPresenter.destroy();

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#listEmptyComponent) {
      remove(this.#listEmptyComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPES.DAY;
    }
  };
}
