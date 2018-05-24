import React, { Component } from 'react';
import { Map } from 'google-maps-react';

import GeoUtils from './GeoUtils';

import LocationSearch from './LocationSearch';
import Area from './Area';
import Slider from './Slider';

const styles = { width: '400px', height: '400px', position: 'static' };
const containerStyles = { paddingTop: '21px', position: 'static' };

const KM = 1000;

export class MapContainer extends Component {

    state = {
        distance: 40,
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
            .then(accumulate(newState, 'center', GeoUtils.calculateBounds, this.distance, this.props.google))
            .then(accumulate(newState, 'selectedBounds'))
            .then(() => {
                this.setState({ initialized: true, ...newState })
            });
    }

    get distance() {
        return this.state.distance * KM;
    }

    handlePlaceChange = (value) => {
        const position = {
            lat: value.lat(),
            lng: value.lng()
        };
        const newBounds = GeoUtils.calculateBounds(
            position,
            this.distance,
            this.props.google
        );
        this.setState({ center: position, selectedBounds: newBounds });
    }

    handleDistanceChange = (value) => {
        
        this.setState({ distance: value }, () => {
            const bounds = GeoUtils.calculateBounds(
                this.state.center,
                this.distance,
                this.props.google
            );
            this.setState({ selectedBounds: bounds })
        });
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
                <Slider value={this.state.distance} onChange={this.handleDistanceChange} />
            </Map>
        );
    }
}

export default MapContainer;