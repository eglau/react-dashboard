import React from 'react';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    }
  }

  componentDidMount() {
    //???
  }

  render() {
    let content;
    if (this.state.isLoaded) {
      content = <div id="customize-script-container" className="u-full-width"></div>;
    } else {
      content = <p>Loading...</p>;
    }
    return (
      <div id="homepage">
        <iframe id="forecast_embed" frameBorder="0" height="245" width="100%" title="weather" src="//forecast.io/embed/#lat=37.3860517&lon=-122.0838511"></iframe>
      </div>
    );
  }
}

export default Homepage;