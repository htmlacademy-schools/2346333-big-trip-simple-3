export const DEFAULT_POINT = {
  basePrice: 500,
  dateFrom: '2022-10-10T22:55:56.845Z',
  dateTo: '2022-10-17T22:55:56.845Z',
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  offers: [],
  type: 'taxi',
};

export const SORT_TYPES = {
  DAY: 'day',
  PRICE: 'price'
};

export const FILTER_TYPES = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future'
};

export const UPDATE_TYPES = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const USER_ACTIONS = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const EmptyListTextValues = {
  [FILTER_TYPES.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPES.FUTURE]: 'There are no future events now',
};
