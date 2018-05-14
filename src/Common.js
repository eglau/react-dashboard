import React from 'react';

function ErrorMessage(props) {
  return (
    <div className="error">
      <h2>An error occurred!</h2>
      <p>{props.message}</p>
    </div>
  );
}

function Loading() {
  return (
    <div className="loader">
      <div className="loader-icon"></div>
      <span className="loader-text">Loading...</span>
    </div>
  );
}

export default {
  ErrorMessage,
  Loading
};