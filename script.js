"use strict";

// Le gameboard
const gameBoard = (() => {
  const row = 3;
  const column = 3;
  //   Le tableau
  let board = [];

  //   Pour créer la grille
  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(columnCell());
    }
  }

  const getBoard = () => board;

  const placeMarker = (row, col, player) => {
    if (board[row][col].getValue() !== 0) return;

    board[row][col].setValue(player.marker);
  };

  return { getBoard, placeMarker };
})();

// L'objet Player
const player = (marker) => {
  let score = 0;

  const addScore = () => {
    score++;
  };

  const getScore = () => score;

  return { marker, addScore, getScore };
};

// Fonction pour créer une case
function columnCell() {
  let value = 0;

  const setValue = (val) => {
    value = val;
  };
  const getValue = () => value;

  return { setValue, getValue };
}

// Fonction pour déterminer le gagnant
function winner(board, player) {
  // Combinaisons de chemins gagnant
  const winningPaths = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 1],
    ],
  ];

  // Si il ya une combinaison gagnante
  // Si il y a une row dont tous les chemins sont identiques
  return winningPaths.some((row) => {
    return row.every((path) => {
      let r = path[0];
      let c = path[1];
      let cell = board[r][c];

      return cell.getValue() === player.marker;
    });
  });
}
