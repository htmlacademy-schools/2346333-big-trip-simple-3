import dayjs from 'dayjs';

export function isFutureDate(date) {
  return dayjs().isBefore(dayjs(date), 'day') || dayjs().isSame(dayjs(date), 'day');
}
