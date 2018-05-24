import React from 'react';
import PropTypes from 'prop-types';

import GeoUtils from './GeoUtils';

export class Area extends React.Component {

  componentDidMount() {
    this.renderArea();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.map !== prevProps.map ||
      !GeoUtils.boundsAreEqual(prevProps.bounds, this.props.bounds)
    ) {
      if (this.area) {
        this.area.setMap(null);
      }
      this.renderArea();
    }
  }

  componentWillUnmount() {
    if (this.area) {
      this.area.setMap(null);
    }
  }

  renderArea() {
    const {
      map,
      google,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      bounds
    } = this.props;

    if (!google || !map) {
      return null;
    }

    this.area = new google.maps.Rectangle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map,
      bounds,
      editable: true,
      draggable: true
    });
  }

  render() {
    return null;
  }
}

export default Area