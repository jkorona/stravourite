import React from 'react';

import Map from './Map';

export default (props) => {

    const runFilter = () => {
        props.onFilter({});
    }

    return (
        <div>
            <Map />
            <button onClick={runFilter}>Filter</button>
        </div>
    );
};
