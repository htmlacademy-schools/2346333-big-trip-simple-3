import dayjs from 'dayjs';

export const humanizePointDate = (date) => dayjs(date).format('MMM D');

export const humanizePointTime = (date) => dayjs(date).format('hh:mm');

export const humanizePointDateNumber = (dueDate) => dayjs(dueDate).format('YYYY-MM-DD');

export const getPointDateRFC = (dueDate) => dayjs(dueDate).format('YYYY-MM-DDTHH:mm');

export const isDataSubmitDisabled = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom)) <= 0;

export const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
