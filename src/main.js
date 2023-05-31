import EventsPresenter from './presenter/presenter.js';
import { render } from './render.js';
import FiltersView from './view/filters-view.js';
import PointsModel from './model/route-points-model.js';

const tripFiltersSection = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');

const tripEventsModel = new PointsModel();
const tripPresenter = new EventsPresenter();

render(new FiltersView(), tripFiltersSection);
tripPresenter.init(tripEventsSection, tripEventsModel);
