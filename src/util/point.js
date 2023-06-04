import dayjs from 'dayjs';

export const humanizePointDate = (date) => dayjs(date).format('D MMM');

export const humanizePointEditDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export const humanizePointRouteTime = (time) => dayjs(time).format('HH:mm');

export const isDataSubmitDisabled = (dateTo, dateFrom) => dayjs(dateTo).diff(dayjs(dateFrom)) < 0;

export const isDatesEqual = (pointA, pointB) => dayjs(pointA.dateFrom).isSame(pointB.dateFrom, 'D');

export const isPriceEqual = (pointA, pointB) => pointA.basePrice === pointB.basePrice;

export const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
