import AbstractView from '../framework/view/abstract-view.js';

const createButtonNewEventTemplate = () => (
  `
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  `
);

export default class ButtonNewEventView extends AbstractView {
  get template() {
    return createButtonNewEventTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setNewEventButtonClickHandler = (callback) => {
    this._callback.click = callback;
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#clickHandler);
  };
}
