import React, { Component } from 'react';

class LocationSearch extends Component {
  state = {
    position: null
  };

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  renderAutoComplete() {
    const { google, map } = this.props;

    if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({ position: place.geometry.location });      
      this.props.onPlaceChanged(place.geometry.viewport.getCenter())
    });
  }

  render() {
    const { position } = this.state;

    return (
      <form onSubmit={this.onSubmit} style={{ position: 'absolute', top: 0, left: 0 }}>
        <input
          placeholder="Enter a location"
          ref={ref => (this.autocomplete = ref)}
          type="text"
        />
        <input type="submit" value="Go" />
      </form>
    );
  }
}

export default LocationSearch;
