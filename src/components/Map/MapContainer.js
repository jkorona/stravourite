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
        distance: 40000,
        bounds: null,
        initialized: false,
        center: null
    };

    componentWillMount() {
        GeoUtils.findCurrentPosition()
            .then((center) => {
                this.updateBounds(center, this.state.distance);
                this.setState({ center, initialized: true })
            });
    }

    updateBounds = (center, distance) => {
        const bounds = GeoUtils.calculateBounds(
            center,
            distance,
            this.props.google
        );
        this.setState({ bounds });
        this.props.onChange(bounds);
    }

    handlePlaceChange = (value) => {
        const position = {
            lat: value.lat(),
            lng: value.lng()
        };
        this.setState({ center: position });
        this.updateBounds(position, this.state.distance);
    }

    handleDistanceChange = (value) => {
        const distance = value * KM;
        this.setState({ distance });
        this.updateBounds(this.state.center, distance);
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
                <Area bounds={this.state.bounds} />
                <Slider value={this.state.distance / KM} onChange={this.handleDistanceChange} />
            </Map>
        );
    }
}

export default MapContainer;