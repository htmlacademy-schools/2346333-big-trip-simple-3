import {FILTER_TYPES} from '../const';
import {isFutureDate} from './common.js';

export const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => points,
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom))
};
