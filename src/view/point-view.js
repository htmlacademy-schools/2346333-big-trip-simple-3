import {createElement} from '../render.js';
import { humanizePointDate, humanizePointTime, humanizePointDateNumber, getPointDateRFC } from '../util.js';

const createPointViewTemplate = (point) => {
  const {dateFrom, dateTo, basePrice, type, destination} = point;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${humanizePointDateNumber(dateFrom)}">${dateFrom ? humanizePointDate(dateFrom) : ''}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getPointDateRFC(dateFrom)}">${dateFrom ? humanizePointTime(dateFrom) : ''}</time>
            &mdash;
            <time class="event__end-time" datetime="${getPointDateRFC(dateTo)}">${dateTo ? humanizePointTime(dateTo) : ''}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
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
};

export default class PointView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get template() {
    return createPointViewTemplate(this.#point);
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
