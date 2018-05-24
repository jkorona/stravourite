import React, { Component } from 'react';
import { Map } from 'google-maps-react';

import GeoUtils from './GeoUtils';

import LocationSearch from './LocationSearch';
import Area from './Area';

const styles = { width: '400px', height: '400px', position: 'static' };
const containerStyles = { paddingTop: '21px', position: 'static' };

export class MapContainer extends Component {

    state = {
        selectedBounds: null,
        initialized: false,
        center: null
    };

    componentWillMount() {
        const newState = {};

        function accumulate(store, propName, nextFn, ...params) {
            return (value) => {
                store[propName] = value;
                return nextFn ? nextFn.call(this, value, ...params) : value;
            };
        }

        GeoUtils.findCurrentPosition()
            .then(accumulate(newState, 'center', GeoUtils.calculateBounds, 40000, this.props.google))
            .then(accumulate(newState, 'selectedBounds'))
            .then(() => {
                this.setState({ initialized: true, ...newState })
            });
    }

    handlePlaceChange = (position) => {
        const newPosition = {
            lat: position.lat(),
            lng: position.lng()
        };
        const newBounds = GeoUtils.calculateBounds(
            newPosition,
            40000,
            this.props.google
        );
        this.setState({ center: newPosition, selectedBounds: newBounds });
    }

    render() {
        if (!this.state.initialized) return null;

        return (
            <Map
                style={styles}
                containerStyle={containerStyles}
                initialCenter={this.state.center}
                google={this.props.google}
                zoom={9}
            >
                <LocationSearch onPlaceChanged={this.handlePlaceChange} />
                <Area bounds={this.state.selectedBounds} />
            </Map>
        );
    }
}

export default MapContainer;