import {render} from './framework/render.js';
import FilterView from './view/filters-view.js';
import NewPointPresenter from './presenter/new-point-presenter.js';
import PointsModel from './model/point-model.js';
import {generateFilter} from './fish/filter.js';

const pointsModel = new PointsModel();

const tripEventsElement = document.querySelector('.trip-events');
const filtersElement = document.querySelector('.trip-controls__filters');
const pagePresenter = new NewPointPresenter(tripEventsElement, pointsModel);

const filters = generateFilter(pointsModel.points);

render(new FilterView(filters), filtersElement);

pagePresenter.init();
