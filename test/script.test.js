import {
  Player, winner, Game, playerInfo,
} from '../src/javascript/index';

const p1 = Player('foo', 'x');
const p2 = Player('tee', 'o');

const game = Game(p1, p2);

it('It Should Text Player Input', () => {
  expect(playerInfo('x', game)).toBe(p1);
});

it('Test if row win', () => {
  const { board } = game.board;
  board[0][0] = 'x';
  board[0][1] = 'x';
  board[0][2] = 'x';
  expect(winner(game)).toBe(p1);
});