import { getTime } from './util/point.js';

export const DEFAULT_POINT = {
  basePrice: null,
  dateFrom: getTime(),
  dateTo: getTime(),
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  offers: [],
  type: 'taxi',
};

export const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future'
};

export const SortType = {
  DAY: 'day',
  PRICE: 'price'
};

export const UserActions = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const EmptyListTextValues = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first event',
  [FilterType.FUTURE]: 'There are no future events now',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const ErrorMessage = 'Sorry. Something went wrong. Please try again later.';
