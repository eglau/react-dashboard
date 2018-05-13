import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Files from './Files.js';
import Events from './Events.js';

import axios from 'axios';

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
    name: 'Events',
    view: 'events'
  }
];

function getEvents() {
  return new Promise((resolve, reject) => {
    axios('http://localhost:4000/events').then((response) => {
      resolve(response.data)
    }).catch((err) => {
      reject(err);
    });
  });
}

function getFiles() {
  return new Promise((resolve, reject) => {
    axios('http://localhost:4000/files').then((response) => {
      resolve(response.data)
    }).catch((err) => {
      reject(err);
    });
  });
}

function Modal(props) {
  return (<div id="modal" className="modal hidden">Hello, World!</div>);
}

function Loading() {
  return (
    <div className="loader">
      <div className="loader-icon"></div>
      <span className="loader-text">Loading...</span>
    </div>
  );
}

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
  componentDidMount() {
    getFiles().then((data) => {
      this.setState({
        files: data,
        isFilesLoaded: true
      })
    });
    getEvents().then((data) => {
      this.setState({
        events: data,
        isEventsLoaded: true
      })
    });
  }
  render() {
    const view = this.state.view;

    let title;
    let content;
    if (view === 'files') {
      title = 'Files';
      if (this.state.isFilesLoaded) {
        content = <Files files={this.state.files} key={title} />;
      } else {
        content = <Loading />;
      }
    } else if (view === 'events') {
      title = 'Upcoming Events';
      if (this.state.isEventsLoaded) {
        content = <Events events={this.state.events} key={title} />
      } else {
        content = <Loading />;
      }
    } else {
      title = 'Welcome!';
      content = (
        <div id="homepage">
          <iframe id="forecast_embed" frameBorder="0" height="245" width="100%" title="weather" src="//forecast.io/embed/#lat=37.3860517&lon=-122.0838511"></iframe>
        </div>
      )
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
        <main>
          <h1>{title}</h1>
          <CSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={300}
            transitionEnterTimeout={300}
            transitionLeave={false}>
            {content}
          </CSSTransitionGroup>
        </main>
        <div className="clear"></div>
        <Modal content={null} />
      </div>
    );
  }
}

export default App;