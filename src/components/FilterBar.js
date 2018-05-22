import React from 'react';

export default (props) => {

    const runFilter = () => {
        props.onFilter({});
    }

    return (
        <div>
            <button onClick={runFilter}>Filter</button>
        </div>
    );
};
