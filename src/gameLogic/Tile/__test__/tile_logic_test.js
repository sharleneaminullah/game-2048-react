import Board from '../Board/Board';
import Tile from './Tile';

jest.mock('./Tile');

let mockHasMoved = jest.fn();
jest.mock('./Tile', () => {
  return jest.fn().mockImplementation(() => { 
    return { hasMoved: mockHasMoved }; 
  });
});

test('Checks if the class is able to call new() on Tile', () => {
  const tile = new Tile();
  expect(tile).toBeTruthy(); 
});

test('Checks if the Board called the Tile constructor', () => { 
  expect(Tile).toHaveBeenCalled();
});

test('You can check if the consumer called the class constructor', () => {
  const board = new Board();
  expect(Tile).toHaveBeenCalledTimes(1);
});

test('You can check if the consumer called the class constructor', () => {
  const board = new Board();
  expect(Tile).not.toHaveBeenCalledTimes(2);
});





