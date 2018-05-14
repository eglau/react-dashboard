import React from 'react';
import Common from './Common.js';

import { CSSTransitionGroup } from 'react-transition-group';
import axios from 'axios';

function toReadableSize(size) {
  let output;
  if (size > 1048576) {
    output = Math.floor((size / 1048576)) + ' MB';
  } else {
    output = Math.floor((size / 1024)) + ' KB';
  }
  return output;
}

class FileTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      files: props.files,
      isMinimized: false
    }
  }
  toggle() {
    const status = !this.state.isMinimized;
    this.setState({
      isMinimized: status
    });
  }
  render() {
    const isMinimized = this.state.isMinimized;
    let filetable;
    let button;
    if (!isMinimized) {
      filetable = (
        <div>
          <hr />
          <table className="file-table u-full-width">
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Upload Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.files.map((file, index) => {
                return (
                  <tr key={file.id} onClick={() => this.downloadFile(file.id)}>
                    <td>{file.name}</td>
                    <td className="w15">{toReadableSize(file.size)}</td>
                    <td className="w20">{file.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      );
      button = <button className="minimize right" onClick={() => this.toggle()}><i className="fas fa-minus"></i></button>;
    } else {
      filetable = null;
      button = <button className="minimize right" onClick={() => this.toggle()}><i className="fas fa-plus"></i></button>;
    }
    return (
      <div className="contentbox">
        <header className="file-table-header">
          {button}
          <h2>{this.state.name}</h2>
        </header>
        <CSSTransitionGroup
          transitionName="fileanim"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {filetable}
        </CSSTransitionGroup>
      </div>
    );
  }
}

class Files extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      data: props.files,
      isLoaded: false,
      error: null
    }
  }
  componentDidMount() {
    let that = this;
    axios('http://localhost:4000/files').then((response) => {
      that.setState({
        data: response.data,
        isLoaded: true
      });
    }).catch((err) => {
      that.setState({
        error: 'Could not connect to Files database'
      });
    });
  }
  render() {
    if (this.state.error) {
      return <Common.ErrorMessage message={this.state.error} />;
    }

    if (!this.state.isLoaded) {
      return <Common.Loading />;
    }

    return (
      <div id="files">
        <h1>File Portal</h1>
        {this.state.data.map((section, index) => {
          return (
            <FileTable key={index} name={section.name} files={section.files} />
          )
        })}
      </div>
    );
  }
}

export default Files;