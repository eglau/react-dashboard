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

const EVENTS = [
  {
    date: "Monday -- March 15, 2018 -- 03/15",
    events: [
      {
        id: '1',
        name: 'First Event',
        time: "1:00PM - 2:00PM",
        attendance: 0,
        location: 'Lobby',
        description: 'This is the first event',
        notes: ''
      },
      {
        id: '2',
        name: 'Second Event',
        time: "7:00AM - 4:00PM",
        attendance: 50,
        location: 'Meeting Room',
        description: 'This is the second event',
        notes: ''
      }
    ]
  },
  {
    date: "Wednesday -- February 22, 2019 -- 02/22",
    events: [
      {
        id: '2',
        name: 'Third Event',
        time: "3:30PM - 5:00PM",
        attendance: 100,
        location: 'Patio',
        description: 'This is the third event',
        notes: 'All meeting rooms available'
      },
      {
        id: '4',
        name: 'Fourth Event',
        time: "3:30PM - 8:00PM",
        attendance: 300,
        location: 'Theatre Room',
        description: 'This is the fourth event',
        notes: ''
      }
    ]
  }
]

function getEvents() {
  return EVENTS;
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

/*function getFile(id) {
  const matches = FILES.filter((file) => {
    return (file.id === id);
  });
  return (matches.length === 1) ? matches[0] : null;
}*/

function Modal(props) {
  return (<div id="modal" className="modal hidden">Hello, World!</div>);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'events',
      events: getEvents(),
      isSidebarVisible: true,
      test: 'not working'
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
        files: data
      })
    })
  }
  render() {
    const view = this.state.view;

    let title;
    let content;
    if (view === 'files') {
      title = 'Files';
      content = <Files files={this.state.files} key={title} />;
    } else if (view === 'events') {
      title = 'Upcoming Events';
      content = <Events events={this.state.events} key={title} />
    } else {
      title = 'Oh no!'
      content = <p key={'1'}>{view} not implemented</p>
    }

    let mainWidthClass;
    let sidebar;
    if (this.state.isSidebarVisible) {
      sidebar = (
        <div className="ten columns">
          <ul id="localnav">
            {SIDEBAR.map((link) => {
              if (link.view === view) {
                return <li key={link.view} className="active" onClick={() => this.switchView(link.view)}>{link.name}</li> 
              }
              return <li key={link.view} onClick={() => this.switchView(link.view)}>{link.name}</li>
            })}
          </ul>
          <h4>Links</h4>
          <ul>
            <li><a href="//www.google.com/">GG</a></li>
          </ul>
        </div>
      );
    } else {
      mainWidthClass = 'full-width';
    }

    return (
      <div id="app">
        <aside id="sidebar">
          <div className="row h100">
            {sidebar}
            <div id="minimizer" className="two columns h100" onClick={() => this.toggleSidebar()}>
                <i className="fas fa-angle-double-left"></i>
            </div>
          </div>
        </aside>
        <main className={mainWidthClass}>
          <h1>{this.state.test}</h1>
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