"use strict";

const boardContainer = document.querySelector(".board");
const playerSelection = document.querySelector(".selection");
const message = document.querySelector(".message");
const span = document.querySelectorAll("span");
const btnRestart = document.querySelector("button");
let row;
let column;

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
  console.log(board);

  const getBoard = () => board;

  // Fonction qui place les pions sur la grille
  const placeMarker = (player, row, col) => {
    if (board[row][col].getValue() != "") {
      console.log("Case déjà occupé");
      return false;
    }

    board[row][col].setValue(player.marker);
    return true;
  };

  const isGameOver = () => {
    return board.every((row) => {
      return row.every((col) => col.getValue() != "");
    });
  };

  // Fonction pour déterminer si il y a un gagnant
  const isWinner = (player) => {
    // Les combinaisons gagnantes possibles
    const winningCombinaisons = [
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
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    return winningCombinaisons.some((row) =>
      row.every((col) => {
        const row = col[0];
        const column = col[1];
        return board[row][column].getValue() === player.marker;
      }),
    );
  };

  return { getBoard, placeMarker, isGameOver, isWinner };
})();

// Objet qui crée les joueurs
const player = (marker) => {
  let score = 0;

  const getScore = () => score;
  const addScore = () => score++;

  return { marker, getScore, addScore };
};

let X = player("X");
let O = player("O");
let activePlayer;

// Objet qui affiche la grille
const displayGame = (() => {
  const displayBoard = () => {
    const visualBoard = gameBoard
      .getBoard()
      .map(
        (row, indexRow) =>
          `
    <div class="row">
      ${row
        .map(
          (col, indexCol) => `
        <div class="col" data-row="${indexRow}" data-col="${indexCol}">${col.getValue()}</div>
        
        `,
        )
        .join("")}
         
      
    </div>
    
    `,
      )
      .join("");

    boardContainer.insertAdjacentHTML("beforeend", visualBoard);
  };

  const hideBoard = () => {
    boardContainer.innerHTML = "";
  };

  // Evènement pour choisir son marker
  playerSelection.addEventListener("click", getPlayerSelection, { once: true });

  // Evènement pour placer un marker sur la grille
  boardContainer.addEventListener("click", placeMarkerOnBoard);

  // Evènement pour renitialiser la grille
  btnRestart.addEventListener("click", resetBoard);

  return { displayBoard, hideBoard };
})();
displayGame.displayBoard();

// Objet qui controle le flux du jeu
const gameFlow = () => {
  let nberOfMarkers = 0;
  let isGameWinner = false;

  let markerPlaced = gameBoard.placeMarker(activePlayer, row, column);
  displayGame.hideBoard();
  displayGame.displayBoard();

  gameBoard.getBoard().forEach((row) =>
    row.forEach((col) => {
      if (col.getValue() != "") {
        nberOfMarkers++;
        console.log(nberOfMarkers);
      }
    }),
  );

  if (markerPlaced) {
    if (nberOfMarkers >= 5) {
      if (gameBoard.isWinner(activePlayer)) {
        message.textContent = `Game over! ${activePlayer.marker}'s winner`;
        message.classList.add("winner");
        boardContainer.removeEventListener("click", placeMarkerOnBoard);
        isGameWinner = true;
        activePlayer.addScore();
        console.log(activePlayer.getScore());
        span.forEach((singleSpan) => {
          if (singleSpan.classList.contains(activePlayer.marker)) {
            singleSpan.textContent = activePlayer.getScore();
          }
        });
      }
    }

    activePlayer == X ? (activePlayer = O) : (activePlayer = X);
    if (!isGameWinner) message.textContent = `${activePlayer.marker}'s turn`;
  }

  if (gameBoard.isGameOver()) {
    let otherPlayer;
    activePlayer == X ? (otherPlayer = O) : (otherPlayer = X);
    message.textContent = `DRAW! ${activePlayer.marker}⚔️${otherPlayer.marker} `;
    message.classList.add("draw");
    boardContainer.removeEventListener("click", placeMarkerOnBoard);
  }
};

// Fonction pour créer une cellule
function cell() {
  let value = "";

  const setValue = (val) => {
    value = val;
  };
  const getValue = () => value;

  return { setValue, getValue };
}

function placeMarkerOnBoard(e) {
  let target = e.target;

  if (target.classList == "row" || target.classList == "col") {
    row = target.dataset.row;
    column = target.dataset.col;
    if (typeof activePlayer == "undefined") return;
    gameFlow();
  }
}

function resetBoard(e) {
  gameBoard.getBoard().forEach((row) => row.forEach((col) => col.setValue("")));
  displayGame.hideBoard();
  displayGame.displayBoard();
  message.classList.remove("winner");
  message.classList.remove("draw");
  message.textContent = "Select a player to start the game";
  boardContainer.removeEventListener("click", placeMarkerOnBoard);
  playerSelection.addEventListener("click", getPlayerSelection, { once: true });
}

function getPlayerSelection(e) {
  let target = e.target;

  if (target.classList.contains("X") || target.classList.contains("O")) {
    target.classList == "X" ? (activePlayer = X) : (activePlayer = O);
    boardContainer.addEventListener("click", placeMarkerOnBoard);
    return true;
  } else {
    return false;
  }
  console.log(`marker selected = ${target.classList}`);
}
