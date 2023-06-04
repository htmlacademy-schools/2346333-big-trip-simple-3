import dayjs from 'dayjs';

export const isFutureDate = (date) => dayjs().isBefore(dayjs(date), 'day') || dayjs().isSame(dayjs(date), 'day');
