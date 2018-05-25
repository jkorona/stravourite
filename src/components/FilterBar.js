import React, { Component } from 'react';

import Map from './Map';

//
export default class FilterBar extends Component {

    state = {
        bounds: []
    }

    runFilter = () => {
        this.props.onFilter(this.state);
    }

    onBoundsChange = (bounds) => {

        this.setState({
            bounds: [
                bounds.north.toFixed(4),
                bounds.west.toFixed(4),
                bounds.south.toFixed(4),
                bounds.east.toFixed(4)
            ]
        });
    }

    render() {
        return (
            <div>
                <Map onChange={this.onBoundsChange} />
                <button onClick={this.runFilter}>Filter</button>
            </div >
        );

    }
}
