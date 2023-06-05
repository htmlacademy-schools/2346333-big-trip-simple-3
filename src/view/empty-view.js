import AbstractView from '../framework/view/abstract-view.js';
import {EmptyListTextValues} from '../const.js';

function createTripListTemplate(filterType, error) {
  const emptyListTextValue = EmptyListTextValues[filterType];

  return (
    `<p class="trip-events__msg">
      ${emptyListTextValue}
      ${error ?? emptyListTextValue}
    </p>`);
}

export default class ListEmptyView extends AbstractView {
  #filterType = null;
  #error = null;

  constructor(filterType, error) {
    super();
    this.#filterType = filterType;
    this.#error = error;
  }

  get template() {
    return createTripListTemplate(this.#filterType, this.#error);
  }
}
