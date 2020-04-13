const Player = (name, input) => ({ name, input });

const Game = (p1, p2) => ({ p1, p2 });
let game = '';
let turn = '';

function clicked() {
  let row = this.parentNode.className;
  row = row.split('-');
  row = row.pop();
  let clm = this.attributes.name.nodeValue;
  clm = clm.split('-');
  clm = clm.pop();
  console.log(clm);

  console.log(row);
  if (turn.input === 'x') {
    this.innerHTML = '<i class="fas fa-times"></i>';
    if (turn === game.p1) {
      turn = game.p2;
    } else {
      turn = game.p1;
    }
  } else {
    this.innerHTML = '<i class="far fa-circle"></i>';
    if (turn === game.p1) {
      turn = game.p2;
    } else {
      turn = game.p1;
    }
  }
}

const Board = () => {
  const array = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
  const show = () => array.forEach((objs) => {
    const div = document.createElement('div');
    div.setAttribute('class', `row-${array.indexOf(objs)}`);
    div.setAttribute('name', `row-${array.indexOf(objs)}`);
    objs.forEach((obj) => {
      const span = document.createElement('span');
      span.setAttribute('name', `clmn-${objs.indexOf(obj)}`);
      span.innerHTML = '';
      div.appendChild(span);
      span.onclick = clicked;
    });
    const board = document.getElementById('board');
    board.appendChild(div);
  });
  return { show, array };
};


window.onload = () => {
  const board = Board();
  board.show();
  const player1 = Player('Daniel', 'x');
  const player2 = Player('Bot', 'o');
  game = Game(player1, player2);
  turn = game.p1;
};
