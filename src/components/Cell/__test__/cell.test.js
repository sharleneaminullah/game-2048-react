import React from 'react';
import ReactDOM from 'react-dom';

import Cell from './../Cell';
import '@testing-library/jest-dom/extend-expect';

test('renders cell without crashing', () => {
    const span = document.createElement('span');
    ReactDOM.render(<Cell></Cell>, span);
})

