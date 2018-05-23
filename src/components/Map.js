import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

import LocationSearch from './LocationSearch';
import Area from './Area';

export class MapContainer extends Component {

    state = {
        position: null
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            this.setState( {position: {
                lat: coords.latitude,
                lng: coords.longitude
            } })
          });
    }

  render() {
    if (!this.state.position) return null;
    return (
        <Map 
            style={ { width: '400px', height: '400px', marginTop: '21px' } }
            initialCenter={this.state.position}
            google={this.props.google} 
            zoom={10}
       >
        <LocationSearch />
        <Area />
       </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY),
  libraries: ['places', 'visualization', 'geometry']
})(MapContainer)