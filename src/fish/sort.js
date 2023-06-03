import {SORT_VALUES} from '../const.js';

export const generateSort = () =>
  Object.values(SORT_VALUES).map((name) => ({name}));

