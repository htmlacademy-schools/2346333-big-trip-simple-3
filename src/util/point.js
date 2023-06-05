import dayjs from 'dayjs';

export function humanizePointDate(date) {
  return dayjs(date).format('D MMM');
}

export function humanizePointEditDate(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

export function humanizePointRouteTime(time) {
  return dayjs(time).format('HH:mm');
}

export function isDataSubmitDisabled(dateTo, dateFrom) {
  return dayjs(dateTo).diff(dayjs(dateFrom)) < 0;
}

export function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA.dateFrom).isSame(dateB.dateFrom, 'D');
}

export function isPriceEqual(pointA, pointB) {
  return pointA.basePrice === pointB.basePrice;
}

export function sortPointDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

export function sortPointPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export function getTime() {
  return new Date().toISOString();
}
