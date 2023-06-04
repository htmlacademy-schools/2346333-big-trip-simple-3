import dayjs from 'dayjs';
import {getRandomInteger, getRandomArrayElement, getRandomSubArray} from '../util/common.js';
import {getRandomDestination} from './destination.js';
import {getOffersByType} from './offer.js';

const EVENT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const MAX_POINT_COUNT = 5;
const MIN_BASE_PRICE = 30;
const MAX_BASE_PRICE = 500;

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const generatePrice = () => getRandomInteger(MIN_BASE_PRICE, MAX_BASE_PRICE);

export const generatePoint = (id) => {
  const type = getRandomArrayElement(EVENT_TYPE);

  return {
    id: id,
    basePrice: generatePrice(),
    dateFrom: generateDate(),
    dateTo: generateDate(),
    destination: getRandomDestination().id,
    offers: getRandomSubArray(getOffersByType(type).offers).map((offer) => offer.id),
    type: type
  };
};

export const generatePoints = () => Array.from({
  length:  getRandomInteger(0, MAX_POINT_COUNT),
}, (_, k) => generatePoint(k + 1));
