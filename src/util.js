import dayjs from 'dayjs';

export const generateRandomNumber = (min, max) => {
  if (min < 0 || min >= max) {
    return 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const humanizePointDate = (date) => {
  dayjs(date).format('MMM D');
};

export const humanizePointTime = (date) => {
  dayjs(date).format('hh:mm');
};

export const humanizePointDateNumber = (dueDate) => {
  dayjs(dueDate).format('YYYY-MM-DD');
};

export const getPointDateRFC = (dueDate) => {
  dayjs(dueDate).format('YYYY-MM-DDTHH:mm');
};
