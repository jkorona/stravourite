import React from 'react';

export default ({ segments }) => {

    function renderRow(row) {
        return (
            <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.distance}</td>
            </tr>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Distance</th>
                </tr>
            </thead>
            <tbody>
                {segments.map(renderRow)}
            </tbody>
        </table>
    )
}
