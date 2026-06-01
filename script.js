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
