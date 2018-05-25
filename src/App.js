import React, { Component } from 'react';

import './App.css';

import withAuthentication from './auth/withAuthentication';
import StravaApi from './StravaApi';

import FilterBar from './components/FilterBar';
import SegmentsTable from './components/SegmentsTable';

class App extends Component {

  state = {
    segments: []
  };

  async handleFilter(filter) {
    const segments = await StravaApi.searchSegments(filter);
    this.setState({ segments });
  }

  render() {
    return (
      <div>
        <FilterBar onFilter={(f) => this.handleFilter(f)} />
        <SegmentsTable segments={this.state.segments} />
      </div>
    );
  }
}

export default withAuthentication(App);
