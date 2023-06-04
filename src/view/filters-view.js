import AbstractView from '../framework/view/abstract-view.js';

const createFiltersTemplate = (filters) => (
  `<form class="trip-filters" action="#" method="get">
    ${filters.length > 0 ? filters.map((filter) => (
    `<div class="trip-filters__filter">
        <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}">
        <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
      </div>`)).join('') : ''
  }
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
