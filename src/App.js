import React from 'react';
//import { CSSTransitionGroup } from 'react-transition-group';


import cfg from './config.json';
import Common from './Common.js';
import Files from './Files.js';
import Events from './Events.js';
import Homepage from './Homepage.js';


const GAPI_KEY = cfg.apikey; //load from local config file

const SIDEBAR = [
  {
    name: 'Homepage',
    view: 'home',
    icon: 'fas fa-home'
  },
  {
    name: 'File Portal',
    view: 'files',
    icon: 'fas fa-list-alt'
  },
  {
    name: 'Upcoming Events',
    view: 'events',
    icon: 'fas fa-calendar-alt'
  }
];



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      isGoogleAPILoaded: false
    }
  }
  loadGoogleAPIClient(script) {
    console.log(script);
    if (script.getAttribute('gapi_processed')) {
      const gapi = window.gapi;
      gapi.load('client', () => {
        gapi.client.setApiKey(GAPI_KEY);
        gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4').then(() => {
          this.setState({ isGoogleAPILoaded: true });
        });
      });
    } else {
      setTimeout(() => this.loadGoogleAPIClient(script), 1000);
    }
  }
  loadGoogleAPI() {
    const script = document.createElement('script');
    //script.async = true;
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      //this.loadGoogleAPIClient(script);
      const gapi = window.gapi;
      gapi.load('client', () => {
        gapi.client.setApiKey(GAPI_KEY);
        gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4').then(() => {
          this.setState({ isGoogleAPILoaded: true });
        });
      });
    };
    document.body.appendChild(script);
  }
  componentDidMount() {
    this.loadGoogleAPI();
  }
  render() {
    const view = this.state.view;

    let content;
    if (!this.state.isGoogleAPILoaded) {
      content = <Common.Loading />;
    } else {
      if (view === 'files') {
        content = <Files files={this.state.files} />;
      } else if (view === 'events') {
        content = <Events events={this.state.events} />;
      } else {
        content = <Homepage />;
      }
    }

    return (
      <div id="app">
        <aside>
          <ul id="localnav">
            {SIDEBAR.map((link) => {
              if (link.view === this.state.view) {
                return <li key={link.view} className="active" >{link.name}</li> 
              }
              return <li key={link.view} onClick={() => this.setState({view: link.view})}>{link.name}</li>
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