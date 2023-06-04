import PagePresenter from './presenter/page-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './point-api.js';

const AUTHORIZATION = 'Basic 7XpWcIl8EN4f';
const URL = 'https://18.ecmascript.pages.academy/big-trip';

const tripEventsElement = document.querySelector('.trip-events');
const filtersElement = document.querySelector('.trip-controls__filters');
const newEventButton = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel(new PointsApiService(URL, AUTHORIZATION));
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(filtersElement, pointsModel, filterModel);
const pagePresenter = new PagePresenter(tripEventsElement, pointsModel, filterModel);

const handleNewEventFormClose = () => {
  newEventButton.disabled = false;
};

const handleNewEventButtonClick = () => {
  pagePresenter.createPoint(handleNewEventFormClose);
  newEventButton.disabled = true;
};

filterPresenter.init();
pagePresenter.init();
pointsModel.init()
  .finally(() => {
    newEventButton.addEventListener('click', handleNewEventButtonClick);
  });
