import AbstractView from '../framework/view/abstract-view.js';
import {EmptyListTextValues} from '../const.js';

const createTripListTemplate = (filterType) => {
  const emptyListTextValue = EmptyListTextValues[filterType];

  return (
    `<p class="trip-events__msg">
      ${emptyListTextValue}
    </p>`);
};

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createTripListTemplate(this.#filterType);
  }
}
