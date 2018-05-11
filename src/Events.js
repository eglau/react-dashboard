import React from 'react';

function EventDateList(props) {
  const date = props.date;
  return (
    <div className="event-date-list">
      <h2 className="event-date-title">{date.date}</h2>
      <div className="event-list">
        {date.events.map((event, index) => {
          return <EventListRow key={index} event={event} />
        })}
      </div>
    </div>
  );
}

function EventListRow(props) {
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

  //const notes = (event.notes) ? (<p>{event.notes}</p>) : null;

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
  render() {
    const events = this.state.events;
    return (
      <div id="events">
        {events.map((date, index) => {
          return <EventDateList key={index} date={date} />
        })}
      </div>
    );
  }
}

export default Events;