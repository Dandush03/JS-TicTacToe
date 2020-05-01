import '../stylesheet/style.scss';

const Player = (name, input) => ({ name, input });

const Board = () => {
  const board = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
  const show = () => board.forEach((objs) => {
    const div = document.createElement('div');
    div.setAttribute('class', `row-${board.indexOf(objs)}`);
    div.setAttribute('name', `row-${board.indexOf(objs)}`);
    objs.forEach((obj) => {
      const span = document.createElement('span');
      span.setAttribute('name', `clmn-${objs.indexOf(obj)}`);
      span.onclick = clicked; // eslint-disable-line
      span.innerHTML = '';
      div.appendChild(span);
    });
    const gameBoard = document.getElementById('board');
    gameBoard.appendChild(div);
  });
  return { show, board };
};

const Game = (p1, p2) => {
  const turn = p1;
  const board = Board();
  const botBoard = [];
  return {
    p1, p2, board, turn, botBoard,
  };
};

let game = '';

function playerInfo(player, game) {
  if (game.p1.input === player) {
    return game.p1;
  }
  return game.p2;
}

const number = (value) => !Number.isNaN(Number(value));

function winner(game) {
  let movements = 9;
  const arr = game.board.board;
  for (let k = 0; k < 3; k += 1) {
    if (arr[k][0] === arr[k][1] && arr[k][1] === arr[k][2] && !number(arr[k][0])) {
      return playerInfo(arr[k][0], game);
    }
    if (arr[0][k] === arr[1][k] && arr[0][k] === arr[2][k] && !number(arr[0][k])) {
      return playerInfo(arr[0][k], game);
    }
    for (let z = 0; z < 3; z += 1) {
      if (!number(arr[k][z], game)) {
        movements -= 1;
      }
    }
  }
  if (arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2] && !number(arr[0][0])) {
    return playerInfo(arr[0][0], game);
  }
  if (arr[0][2] === arr[1][1] && arr[0][2] === arr[2][0] && !number(arr[0][2])) {
    return playerInfo(arr[0][2], game);
  }
  if (movements === 0) {
    return 'Tie';
  }
  return '';
}

function validate(obj) {
  const msg = document.getElementById('msg-log');
  let boolean = '';
  msg.innerHTML = '';
  const span = document.createElement('h2');
  if (obj.innerHTML === '') {
    span.innerHTML = `Great Move ${game.turn.name}!`;
    span.setAttribute('class', 'good');
    boolean = true;
  } else {
    span.innerHTML = `Can't you see ${game.turn.name}? This spot is taken. WRONG MOVE`;
    span.setAttribute('class', 'wrong');
    boolean = false;
  }
  msg.appendChild(span);
  return boolean;
}

function checkAvailableMovement() {
  const botBoard = [];
  const arr = game.board.board;
  arr.forEach((arrs) => {
    const newArr = [];
    arrs.forEach((elements) => {
      if (number(elements)) {
        newArr.push(elements);
      }
    });
    if (newArr.length > 0) {
      botBoard.push(newArr);
    }
  });
  game.botBoard = botBoard;
  if (botBoard.length !== 0) {
    return true;
  }
  return false;
}

function replay() {
  location.reload(); // eslint-disable-line no-restricted-globals
}

function newGame() {
  localStorage.removeItem('p1');
  localStorage.removeItem('p2');
  location.reload(); // eslint-disable-line no-restricted-globals
}

function endGame() {
  if (winner(game) !== '' || !checkAvailableMovement()) {
    const player = winner(game);
    const stopBoard = document.querySelectorAll('span[name^="clmn-"]');
    stopBoard.forEach((obj) => {
      obj.setAttribute('onClick', '');
    });

    const winningMsg = document.createElement('span');
    winningMsg.setAttribute('class', 'win-msg');
    if (winner(game) !== 'Tie') {
      winningMsg.innerHTML = `And The Winner is ${player.name.toUpperCase()}!`;
    } else {
      winningMsg.innerHTML = 'It\'s a TIE! ! !';
    }
    const board = document.getElementById('board');
    board.appendChild(winningMsg);
  }
}

function Choices() {
  const board = document.getElementById('board');
  const div = document.createElement('div');
  div.setAttribute('class', 'choice');
  const btn1 = document.createElement('button');
  btn1.innerHTML = 'Replay?';
  btn1.onclick = replay;
  const btn2 = document.createElement('button');
  btn2.innerHTML = 'New Game?';
  btn2.onclick = newGame;
  div.appendChild(btn1);
  div.appendChild(btn2);
  board.appendChild(div);
}

function clicked() {
  let row = this.parentNode.className;
  row = row.split('-');
  row = row.pop();
  let clm = this.attributes.name.nodeValue;
  clm = clm.split('-');
  clm = clm.pop();
  if (game.turn.input === 'x' && validate(this)) {
    game.board.board[row][clm] = 'x';
    this.innerHTML = '<i class="fas fa-times"></i>';
    if (game.turn === game.p1) {
      game.turn = game.p2;
    } else {
      game.turn = game.p1;
    }
  } else if (validate(this)) {
    game.board.board[row][clm] = 'o';
    this.innerHTML = '<i class="far fa-circle"></i>';
    if (game.turn === game.p1) {
      game.turn = game.p2;
    } else {
      game.turn = game.p1;
    }
  }
  endGame();
}

const PlayerFrm = (number) => {
  const main = document.createElement('div');
  const lbl = document.createElement('label');
  const container = document.createElement('div');
  const title = document.createElement('h3');
  const p = `player-${number}`;
  main.appendChild(title);
  main.id = p;
  title.innerHTML = `Player ${number}`;
  lbl.setAttribute('for', p);
  lbl.innerHTML = 'Name';
  container.appendChild(lbl);
  const input = document.createElement('input');
  input.setAttribute('name', p);
  container.appendChild(input);
  main.appendChild(container);
  return main;
};

function validateFrm() {
  const qry = document.querySelectorAll('input');
  let boolean = true;
  qry.forEach((obj) => {
    const get = document.getElementById(obj.name + 1);
    if (get) {
      get.parentNode.removeChild(get);
    }
    if (obj.value === '') {
      boolean = false;
      const msg = document.getElementById('msg-log');
      const text = document.createElement('span');
      text.innerHTML = `${obj.name} name can not be empty`;
      text.id = obj.name + 1;
      msg.appendChild(text);
    }
  });
  return boolean;
}

function onSubmitFrV() {
  if (validateFrm()) {
    const frm = document.getElementById('player-2');
    if (frm) {
      let p1 = document.getElementsByName('player-1');
      p1 = p1[0].value;
      let p2 = document.getElementsByName('player-2');
      p2 = p2[0].value;
      localStorage.setItem('p1', JSON.stringify(p1));
      localStorage.setItem('p2', JSON.stringify(p2));
    } else {
      let p1 = document.getElementsByName('player-1');
      p1 = p1[0].value;
      const p2 = 'bot';
      localStorage.setItem('p1', JSON.stringify(p1));
      localStorage.setItem('p2', JSON.stringify(p2));
    }
  } else {
    return false;
  }
  return true;
}

const gameStyle = (numberOfPlayer) => {
  if (numberOfPlayer === 2) {
    const frm = document.createElement('form');
    frm.onsubmit = onSubmitFrV;
    const div = document.createElement('div');
    div.appendChild(PlayerFrm(1));
    div.appendChild(PlayerFrm(2));
    frm.appendChild(div);
    const btn = document.createElement('button');
    btn.innerHTML = 'Submit';
    frm.appendChild(btn);
    const container = document.getElementById('msg-log');
    container.innerHTML = '';
    container.appendChild(frm);
  } else {
    const frm = document.createElement('form');
    frm.onsubmit = onSubmitFrV;
    const div = document.createElement('div');
    div.appendChild(PlayerFrm(1));
    div.setAttribute('class', 'solo');
    frm.appendChild(div);
    const btn = document.createElement('button');
    btn.innerHTML = 'Submit';
    frm.appendChild(btn);
    const container = document.getElementById('msg-log');
    container.innerHTML = '';
    container.appendChild(frm);
  }
};

function menu1() {
  gameStyle(2);
}

function menu2() {
  gameStyle(1);
}

const gameMenu = () => {
  const btn1 = document.createElement('button');
  btn1.innerHTML = 'Player VS Player';
  btn1.onclick = menu1;
  const btn2 = document.createElement('button');
  btn2.innerHTML = 'Player VS Bot';
  btn2.onclick = menu2;
  btn2.disabled = true;
  const container = document.getElementById('msg-log');
  container.innerHTML = '';
  container.appendChild(btn1);
  container.appendChild(btn2);
};

window.onload = () => {
  const p1 = JSON.parse(localStorage.getItem('p1'));
  const p2 = JSON.parse(localStorage.getItem('p2'));
  if (p1) {
    game = Game(Player(p1, 'x'), Player(p2, 'o'));
    game.board.show();
    Choices();
  } else {
    gameMenu();
  }
};

export {
  Player, winner, Game, playerInfo, number,
};