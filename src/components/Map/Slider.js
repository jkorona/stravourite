import React, { Component } from 'react';


export default class Slider extends Component {

    onChange = (event) => {
        this.props.onChange(event.target.value);
    }

    render() {
        return <input type="range" min="1" max="200" step="10" value={this.props.value} onChange={this.onChange} />
    }

}
