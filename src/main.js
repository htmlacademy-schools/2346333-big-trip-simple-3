import NewPointPresenter from './presenter/new-point-presenter.js';
import { render } from './render.js';
import FiltersView from './view/filters-view.js';
import PointsModel from './model/point-model.js';
import { generateFilter } from './fish/filter.js';

const tripFiltersSection = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');

const tripEventsModel = new PointsModel();
const tripPresenter = new NewPointPresenter();

const filters = generateFilter(tripEventsModel.points);

render(new FiltersView(filters), tripFiltersSection);
tripPresenter.init(tripEventsSection, tripEventsModel);
