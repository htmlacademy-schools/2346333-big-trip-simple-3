export function isFutureDate(date) {
  return Date.parse(date) >= Date.now();
}
