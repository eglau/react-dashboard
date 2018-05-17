import React from 'react';

import Events from './Events.js';



class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }
  readFromGoogleSheets() {
    const self = this;
    const gapi = window.gapi;
    
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1odDYjVRSktN_5csh3xQIBQzME2ME4q6Gwj7Oj5lni7M',
      range: 'A2:H',
    }).then((response) => {
      let eventsListing = [];
      const today = new Date().setHours(0, 0, 0, 0);
      response.result.values.filter((event) => {
        const date = new Date(event[0]);
        return (today === date.setHours(0, 0, 0, 0));
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
        return null; //suppress warning message
      });
      self.setState({
        events: eventsListing
      })
    }, (response) => {
      self.setState({
        error: response.result.error.message
      });
    });
  }
  componentDidMount() {
    this.readFromGoogleSheets();  
  }
  render() {
    return (
      <div id="homepage">
        <h1>Welcome!</h1>
        <iframe id="forecast_embed" frameBorder="0" height="245" width="100%" title="weather" src="//forecast.io/embed/#lat=37.3860517&lon=-122.0838511"></iframe>
        <h2>Events Today</h2>
        <Events events={this.state.events} />
      </div>
    );
  }
}

export default Homepage;