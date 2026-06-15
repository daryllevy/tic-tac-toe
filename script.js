"use strict";

// <-- Etapes pour créer mon Tic Tac Toe : -->

// 4. Je vérifie si le jeu est terminé
// 5. Je vérifie si on a un gagnant ou un match nul

// 1. Je crée la grille
// Mon objet qui crée la grille
const gameBoard = (() => {
  const row = 3;
  const column = 3;
  let board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(cell());
    }
  }

  const getBoard = () => board;

  // 3. Je place les pions sur la grille
  const placeMarker = (player, row, col) => {
    if (board[row][col].getValue() != 0) {
      console.log("Case déjà occupé");
      return;
    }

    board[row][col].setValue(player.marker);
  };

  console.log(board);
  return { getBoard, placeMarker };
})();

// 2. Je créer les joueurs
// Mon objet qui crée les joueurs
const player = (marker) => {
  let score = 0;

  const getScore = () => score;
  const addScore = () => score++;

  return { marker, getScore, addScore };
};

// Fonction pour créer une cellule
function cell() {
  let value = 0;

  const setValue = (val) => {
    value = val;
  };
  const getValue = () => value;

  return { setValue, getValue };
}
