import React from 'react';
//import { CSSTransitionGroup } from 'react-transition-group';
import Files from './Files.js';
import Events from './Events.js';
import Homepage from './Homepage.js';

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
  render() {
    const view = this.state.view;

    let content;
    if (view === 'files') {
      content = <Files files={this.state.files} />;
    } else if (view === 'events') {
      content = <Events events={this.state.events} />;
    } else {
      content = <Homepage />;
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