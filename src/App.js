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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'files',
      isSidebarVisible: true,
      files: [],
      events: [],
      isFilesLoaded: false
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
      default:
        state = {
          view: 'home'
        }
        break;
    }
    this.setState(state);
  }
  toggleSidebar() {
    const isSidebarVisible = this.state.isSidebarVisible;
    this.setState({
      isSidebarVisible: !isSidebarVisible
    })
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
        events: data
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
        content = <p>Loading...</p>;
      }
    } else if (view === 'events') {
      title = 'Upcoming Events';
      content = <Events events={this.state.events} key={title} />
    } else {
      title = 'Oh no!'
      content = <p key={'1'}>{view} not implemented</p>
    }

    let mainWidthClass;
    let indicator;
    let sidebar;
    if (this.state.isSidebarVisible) {
      sidebar = (
        <div id="sidebar" className="ten columns">
          <ul id="localnav">
            {SIDEBAR.map((link) => {
              if (link.view === view) {
                return <li key={link.view} className="active" onClick={() => this.switchView(link.view)}>{link.name}</li> 
              }
              return <li key={link.view} onClick={() => this.switchView(link.view)}>{link.name}</li>
            })}
          </ul>
        </div>
      );
      indicator = "fas fa-angle-double-left";
    } else {
      mainWidthClass = 'full-width';
      indicator = "fas fa-angle-double-right";
    }



    return (
      <div id="app">
        <aside>
          <div className="row h100">
            {sidebar}
            <div id="minimizer" className="two columns h100" onClick={() => this.toggleSidebar()}>
                <i className={indicator}></i>
            </div>
          </div>
        </aside>
        <main className={mainWidthClass}>
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