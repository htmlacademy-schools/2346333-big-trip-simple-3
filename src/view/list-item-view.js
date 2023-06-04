import AbstractView from '../framework/view/abstract-view.js';

function createEventListItemTemplate () {
  return '<li class="trip-events__item"></li>';
}

export default class EventListItemView extends AbstractView{
  get template() {
    return createEventListItemTemplate();
  }
}
