import React from 'react';
import Events from './Events.js';
import Common from './Common.js';
import axios from 'axios';


class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoaded: false
    }
  }
  componentDidMount() {
    let that = this;
    axios('http://localhost:4000/events').then((response) => {
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
    if (!this.state.isLoaded) {
      return <Common.Loading />;
    }
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