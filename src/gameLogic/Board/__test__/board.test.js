import Board from '../Board';

jest.mock('../Board');

let mockMoveLeft = jest.fn();
jest.mock('../Board', () => {
  return jest.fn().mockImplementation(() => { 
    return { moveLeft: mockMoveLeft }; 
  });
});

test('Checks if the class is able to call new() on Board', () => {
    const board = new Board();
    expect(board).toBeTruthy(); 
  });