import React, { Component } from 'react';

import './App.css';

import withAuthentication from './auth/withAuthentication';
import StravaApi from './StravaApi';

import FilterBar from './components/FilterBar';
import SegmentsTable from './components/SegmentsTable';
import Map from './components/Map';

class App extends Component {

  state = {
    segments: []
  };

  async handleFilter() {
    const segments = await StravaApi.getStarredSegments();
    this.setState({ segments });
  }

  render() {
    return (
      <div>
        <FilterBar onFilter={(f) => this.handleFilter(f)} />
        <div>
          <Map />
        </div>
        <SegmentsTable segments={this.state.segments} />
      </div>
    );
  }
}

export default withAuthentication(App);
