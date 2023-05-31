import { TYPES, TOWNS, DESCRIPTIONS } from '../const.js';
import { generateRandomNumber } from '../util.js';
import dayjs from 'dayjs';

const generateDescription = () => {
  const index = generateRandomNumber(0, DESCRIPTIONS.length - 1);
  return DESCRIPTIONS[index];
};

const generateType = () => {
  const index = generateRandomNumber(0, TYPES.length - 1);
  return TYPES[index];
};

const generateTitle = () => {
  const index = generateRandomNumber(0, TOWNS.length - 1);
  return TOWNS[index];
};

const generateImage = () => ({
  src: `http://picsum.photos/248/152?r=${generateRandomNumber(0, 100)}`,
  description: generateDescription()
});

const generateDestination = () => {
  const destination = {
    id: generateRandomNumber(0, 49),
    description: generateDescription(),
    name: generateTitle(),
    pictures: Array.from({length: 4}, generateImage)
  };

  return destination;
};

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = generateRandomNumber(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();

};

const generateOffer = () => {
  const offer = {
    id: generateRandomNumber(0, 49),
    title: generateTitle(),
    price: generateRandomNumber(1, 500000)
  };

  return offer;
};

export const generatePoint = () => ({
  'base_price': generateRandomNumber(1, 5000),
  'date_from': generateDate(),
  'date_to': generateDate(),
  'destination': generateDestination(),
  'offers': Array.from({length: 5}, generateOffer),
  'type': generateType()
});
