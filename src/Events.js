import React from 'react';
import Common from './Common.js';

//import { CSSTransitionGroup } from 'react-transition-group';
import axios from 'axios';

function EventBox(props) {
  const date = props.date;
  return (
    <div className="contentbox">
      <h2>{date.date}</h2>
      <hr/>
      <div className="event-list">
        {date.events.map((event, index) => {
          return <EventBoxItem key={index} event={event} />
        })}
      </div>
    </div>
  );
}

function EventBoxItem(props) {
  const event = props.event;

  let leftblock;
  if (event.attendance === 0) {
    leftblock = (
      <div className="three columns event-row-left">
        <div className="event-time-no-attendance">
          <span>{event.time}</span>
        </div>
      </div>
    );
  } else {
    let color;
    if (event.attendance <= 50) {
      color = 'green';
    } else if (event.attendance <= 200) {
      color = 'yellow';
    } else {
      color = 'red';
    }
    leftblock = (
      <div className="three columns event-row-left">
        <div className="event-time">
          <span>{event.time}</span>
        </div>
        <div className={color}>
          <span><i className="fa fa-user"></i> {event.attendance}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="event row" data-id={event.id}>
      {leftblock}
      <div className="nine columns event-row-right">
        <h3>{event.name}</h3>
        <p>
        <span><i className="fa fa-arrow-circle-right"></i> {event.location}</span>
        <br/>
        <span>{event.notes}</span>
        </p>
      </div>
    </div>
  );
}

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: props.events
    }
  }
  componentDidMount() {
    let that = this;
    axios('http://192.168.1.81:4000/events').then((response) => {
      that.setState({
        events: response.data,
        isLoaded: true
      });
    }).catch((err) => {
      that.setState({
        error: 'Could not connect to Events database'
      });
    });
  }
  render() {
    if (this.state.error) {
      return <Common.ErrorMessage message={this.state.error} />;
    }

    if (!this.state.isLoaded) {
      return <Common.Loading />;
    }
    return (
      <div id="events">
        {this.state.events.map((date, index) => {
          return <EventBox key={index} date={date} />
        })}
      </div>
    );
  }
}

export default Events;