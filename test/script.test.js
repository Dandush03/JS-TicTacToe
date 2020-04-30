import {
  Player, winner, Game, playerInfo, number,
} from '../src/javascript/index';

const p1 = Player('foo', 'x');
const p2 = Player('tee', 'o');

const game = Game(p1, p2);

it('It Should Text Player Input', () => {
  expect(playerInfo('x', game)).toBe(p1);
});

it('Should Win a row and return Player 1', () => {
  const { board } = game.board;
  board[0][0] = 'x';
  board[0][1] = 'x';
  board[0][2] = 'x';
  expect(winner(game)).toBe(p1);
});

it('Should win a colum and return Player 2', () => {
  const { board } = game.board;
  board[0][0] = 'o';
  board[1][0] = 'o';
  board[2][0] = 'o';
  expect(winner(game)).toBe(p2);
});

it('Should win a horizontal(1) and return Player 2', () => {
  const { board } = game.board;
  board[0][0] = 'o';
  board[1][1] = 'o';
  board[0][2] = 'o';
  expect(winner(game)).toBe(p2);
});

it('Should win a horizontal(1) and return Player 2', () => {
  const { board } = game.board;
  board[0][2] = 'o';
  board[1][1] = 'o';
  board[2][0] = 'o';
  expect(winner(game)).toBe(p2);
});

it('Should Check if 2 is Number', () => {
  expect(number(2)).toBe(true);
});

it('Should Check if a is Number', () => {
  expect(number('a')).toBe(false);
});