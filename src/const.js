export const DEFAULT_POINT = {
  basePrice: 700,
  dateFrom: '2023-09-10T22:55:56.845Z',
  dateTo: '2023-09-17T22:55:56.845Z',
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  offers: [],
  type: 'taxi',
};

export const FILTER_TYPES = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future'
};

export const SORT_TYPES = {
  DAY: 'day',
  PRICE: 'price'
};

export const USER_ACTIONS = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UPDATE_TYPES = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const EmptyListTextValues = {
  [FILTER_TYPES.EVERYTHING]: 'Click New Event to create your first event',
  [FILTER_TYPES.FUTURE]: 'There are no future events now',
};
