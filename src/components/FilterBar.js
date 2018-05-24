import React, { Component } from 'react';

import Map from './Map';

export default class FilterBar extends Component {

    state = {
        bounds: []
    }

    runFilter = () => {
        this.props.onFilter(this.state);
    }

    onBoundsChange = (bounds) => {
        this.setState({ bounds: Object.values(bounds) })
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
