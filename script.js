const Player = (name, input) => ({ name, input });

const PlayerFrm = (number) => {
  const main = document.createElement('div');
  const lbl = document.createElement('label');
  const container = document.createElement('div');
  const title = document.createElement('h3');
  main.appendChild(title);
  main.id = 'players';
  title.innerHTML = `Player ${number}`;
  lbl.setAttribute('for', 'name');
  lbl.innerHTML = 'Name';
  container.appendChild(lbl);
  const input = document.createElement('input');
  input.setAttribute('name', 'name');
  container.appendChild(input);
  main.appendChild(container);
  return main;
};

const gameStyle = (numberOfPlayer) => {
  if (numberOfPlayer === 2) {
    const frm = document.createElement('form');
    const div = document.createElement('div');
    div.appendChild(PlayerFrm(1));
    div.appendChild(PlayerFrm(2));
    frm.appendChild(div);
    const btn = document.createElement('button');
    btn.innerHTML = 'Submit';
    frm.appendChild(btn);
    const container = document.getElementById('msg-log');
    container.appendChild(frm);
  } else {
    const frm = document.createElement('form');
    const div = document.createElement('div');
    div.appendChild(PlayerFrm(1));
    div.setAttribute('class', 'solo');
    frm.appendChild(div);
    const btn = document.createElement('button');
    btn.innerHTML = 'Submit';
    frm.appendChild(btn);
    const container = document.getElementById('msg-log');
    container.appendChild(frm);
  }
};


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
    const gameboard = document.getElementById('board');
    gameboard.appendChild(div);
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

let game = Game();

function playerInfo(player) {
  if (game.p1.input === player) {
    return game.p1;
  }
  return game.p2;
}

const number = (value) => !Number.isNaN(Number(value));

function winner() {
  let movements = 9;
  const arr = game.board.board;
  for (let k = 0; k < 3; k += 1) {
    if (arr[k][0] === arr[k][1] && arr[k][1] === arr[k][2] && !number(arr[k][0])) {
      return playerInfo(arr[k][0]);
    }
    if (arr[0][k] === arr[1][k] && arr[0][k] === arr[2][k] && !number(arr[0][k])) {
      return playerInfo(arr[0][k]);
    }
    for (let z = 0; z < 3; z += 1) {
      if (!number(arr[k][z])) {
        movements -= 1;
      }
    }
  }
  if (arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2] && !number(arr[0][0])) {
    return playerInfo(arr[0][0]);
  }
  if (arr[0][2] === arr[1][1] && arr[0][2] === arr[2][0] && !number(arr[0][2])) {
    return playerInfo(arr[0][2]);
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

function endGame() {
  if (winner() !== '' || !checkAvailableMovement()) {
    const player = winner();
    const stopBoard = document.querySelectorAll('span[name^="clmn-"]');
    stopBoard.forEach((obj) => {
      obj.setAttribute('onClick', '');
    });

    const winningMsg = document.createElement('span');
    winningMsg.setAttribute('class', 'win-msg');
    if (winner() !== 'Tie') {
      winningMsg.innerHTML = `And The Winner is ${player.name.toUpperCase()}!`;
    } else {
      winningMsg.innerHTML = 'It\'s a TIE! ! !';
    }
    const board = document.getElementById('board');
    board.appendChild(winningMsg);
  }
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

window.onload = () => {
  gameStyle(1);
  const player1 = Player('Daniel', 'x');
  const player2 = Player('Bot', 'o');
  game = Game(player1, player2);
};
