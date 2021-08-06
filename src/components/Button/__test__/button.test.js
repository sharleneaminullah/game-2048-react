import React from 'react';
import ReactDOM from 'react-dom';

import Button from './../Button';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

test('renders without crashing', () => {
    const div= document.createElement('div');
    ReactDOM.render(<Button></Button>, div);
})

test('renders button enabled', () => {
    render(<Button className="Reset"></Button>)
    expect(screen.getByTestId('button')).not.toBeDisabled()
}) 

test('renders button name', () => {
    render(<Button children="New Game"></Button>)
    expect(screen.getByTestId('button')).toHaveTextContent('New Game')
}) 

test('renders button click', () => {
const mockFunction = jest.fn(() => console.info('button clicked'));
render(<Button onClick={mockFunction} />);
const myButton = screen.getByTestId('button');
userEvent.click(myButton);
expect(mockFunction).toHaveBeenCalledTimes(1);
}) 