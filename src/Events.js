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
        <span>{event.details}</span>
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
  loadGoogleAPI() {
    const that = this;
    const GAPI_KEY = '???'; //load from local file

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      const gapi = window.gapi;
      gapi.load('client', () => {
        gapi.client.setApiKey(GAPI_KEY);
        gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4').then(() => {
          gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1odDYjVRSktN_5csh3xQIBQzME2ME4q6Gwj7Oj5lni7M',
            range: 'A2:H',
          }).then((response) => {
            let eventsListing = [];
            const today = new Date().setHours(0, 0, 0, 0);
            response.result.values.filter((event) => {
              const date = new Date(event[0]);
              return (today <= date.setHours(0,0,0,0));
            }).map((event) => {
              //check if listing for date exists and get index if so
              let listingIndex = -1;
              for (let i = 0; i < eventsListing.length; i++) {
                if (eventsListing[i].date === event[0]) {
                  listingIndex = i;
                }
              }
              //create listing if nonexistant
              if (listingIndex === -1) {
                listingIndex = eventsListing.length;
                eventsListing.push({
                  date: event[0],
                  events: []
                });
              }
              //add event to listing
              eventsListing[listingIndex].events.push({
                id: '123',
                name: event[5],
                time: `${event[1]} - ${event[2]}`,
                attendance: event[3],
                location: event[6],
                details: event[7]
              });
            });
            that.setState({
              events: eventsListing,
              isLoaded: true
            })
          }, (response) => {
            that.setState({
              error: response.result.error.message
            });
          });
        });
      });
    };
    document.body.appendChild(script);
  }
  componentDidMount() {
    this.loadGoogleAPI();
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