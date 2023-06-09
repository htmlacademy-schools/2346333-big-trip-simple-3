import { humanizePointDate, humanizePointRouteTime} from '../util/point.js';
import AbstractView from '../framework/view/abstract-view.js';

const createEventViewTemplate = (point) => {
  const {
    dateFrom,
    dateTo,
    basePrice,
    type,
    destination,
    offers
  } = point;

  const startDate = humanizePointRouteTime(dateFrom);
  const endDate = humanizePointRouteTime(dateTo);

  const pointDate = humanizePointDate(dateFrom);

  const offersTemplate = offers.map((offer) =>
    `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
    </li>`
  ).join('');

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${pointDate}">${pointDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${startDate}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${endDate}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createEventViewTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
