import {createElement} from '../render.js';

const createEventViewTemplate = () => (
  `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-19">MAR 19</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/sightseeing.png" alt="Event type icon">
      </div>
      <h3 class="event__title">Sightseeing Chamonix</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-19T11:20">14:20</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-19T13:00">13:00</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">50</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Book tickets</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">40</span>
        </li>
        <li class="event__offer">
          <span class="event__offer-title">Lunch in city</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">30</span>
        </li>
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
);

export default class EventView {
  #element = null;

  get template() {
    return createEventViewTemplate();
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
