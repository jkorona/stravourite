import React from 'react';
import PropTypes from 'prop-types';

export class Area extends React.Component {

  componentDidMount() {
    this.renderArea();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.map !== prevProps.map
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
      paths,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      ...props
    } = this.props;

    if (!google || !map) {
      return null;
    }

    const params = {
      map,
      paths,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      ...props
    };

    const center = map.getCenter();

    const bottomRight = google.maps.geometry.spherical.computeOffset(
      center,
      5000,
      -45
    );

    const topLeft = google.maps.geometry.spherical.computeOffset(
      center,
      5000,
      135
    );

    const bounds = {
      north: topLeft.lat(),
      south: bottomRight.lat(),
      west: bottomRight.lng(),
      east: topLeft.lng()
    };

    this.area = new google.maps.Rectangle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      bounds,
      editable: true
    });
  }

  render() {
    return null;
  }
}

export default Area