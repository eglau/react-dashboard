import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

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
      data: props.files
    }
  }
  render() {
    const data = this.state.data;
    return (
      <div id="files">
        {data.map((section, index) => {
          return (
            <FileTable key={index} name={section.name} files={section.files} />
          )
        })}
      </div>
    );
  }
}

export default Files;