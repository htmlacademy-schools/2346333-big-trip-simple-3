import {createElement} from '../render.js';

const createEmptyTemplate = () => (
  `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">Click New Event to create your first point</p>
    </section>`
);

export default class EmptyView {
  #element = null;

  get template() {
    return createEmptyTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
