import React from 'react';
import ReactDOM from 'react-dom';

import Score from './../Score';
import {render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('renders without crashing', () => {
    const div= document.createElement('div');
    ReactDOM.render(<Score></Score>, div);
})

test('renders score header', () => {
    render(<Score />)
    expect(screen.getByText('SCORE')).toHaveTextContent('SCORE')
}) 

test('renders score value', () => {
    render(<Score />)
    expect(screen.queryByTestId('score-value')).toBeInTheDocument()
}) 