import React from 'react';
//import { CSSTransitionGroup } from 'react-transition-group';
import Files from './Files.js';
import Events from './Events.js';

//import axios from 'axios';

const SIDEBAR = [
  {
    name: 'Homepage',
    view: 'home'
  },
  {
    name: 'File Portal',
    view: 'files'
  },
  {
    name: 'Upcoming Events',
    view: 'events'
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      files: [],
      events: [],
      isFilesLoaded: false,
      isEventsLoaded: false
    }
  }
  switchView(view) {
    let state;
    switch(view) {
      case 'files':
        state = {
          view: 'files'
        }
        break;
      case 'events':
        state = {
          view: 'events'
        }
        break;
      case 'home':
      default:
        state = {
          view: 'home'
        }
        break;
    }
    this.setState(state);
  }
  render() {
    const view = this.state.view;

    let content;
    if (view === 'files') {
      content = <Files files={this.state.files} />;
    } else if (view === 'events') {
      content = <Events events={this.state.events} />;
    } else {
      content = (
        <div id="homepage">
          <h1>Welcome!</h1>
          <iframe id="forecast_embed" frameBorder="0" height="245" width="100%" title="weather" src="//forecast.io/embed/#lat=37.3860517&lon=-122.0838511"></iframe>
        </div>
      );
    }

    return (
      <div id="app">
        <aside>
          <ul id="localnav">
            {SIDEBAR.map((link) => {
              if (link.view === view) {
                return <li key={link.view} className="active" onClick={() => this.switchView(link.view)}>{link.name}</li> 
              }
              return <li key={link.view} onClick={() => this.switchView(link.view)}>{link.name}</li>
            })}
          </ul>
        </aside>
        <main>{content}</main>
        <div className="clear"></div>
      </div>
    );
  }
}

export default App;