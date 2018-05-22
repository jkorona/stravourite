import React from 'react';

export default ({ segments }) => {

    function renderRow(row) {
        return (
            <tr>
                <td>{row.name}</td>
                <td>{row.distance}</td>
            </tr>
        );
    }

    return (
        <table>
            <thead>
                <th>Name</th>
                <th>Distance</th>
            </thead>
            <tbody>
                {segments.map(renderRow)}
            </tbody>
        </table>
    )
}
