import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/point-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class EventsPresenter {
  tripListComponent = new TripEventsListView();
  sortViewComponent = new SortView();

  init = (eventsContainer, pointsModel) => {
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
    this.points = [...this.pointsModel.getPoints()];

    render(this.sortViewComponent, this.eventsContainer);
    render(this.tripListComponent, this.eventsContainer);
    render(new EventEditView(this.points[0]), this.tripListComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new EventView(this.points[i]), this.tripListComponent.getElement());
    }
  };
}
