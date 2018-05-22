import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import withAuthentication from './auth/withAuthentication';
import StravaApi from './StravaApi';

class App extends Component {

  componentWillMount() {
    const { athlete } = this.props;

    StravaApi.getStarredSegments()
      .then((data) => console.log(data));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default withAuthentication(App);
