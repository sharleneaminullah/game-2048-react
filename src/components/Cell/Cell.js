import React from 'react';
import './cell.scss';

/* This is the placeholder for the Tile */

const Cell = ({id}) => {
    return (
        <span data-testid="span" className="cell"></span>
    );
};

export default Cell;