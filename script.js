"use strict";

// <-- Etapes pour créer mon Tic Tac Toe : -->

//** */ 7. écrire la logique qui permet au joueur de mettre leur marker sur une case de la grille
// 8. Retenir les scores
// 9. créer les boutons start et restart

const boardContainer = document.querySelector(".board");

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
  console.log(board);

  const getBoard = () => board;

  // 3. Je place les pions sur la grille
  const placeMarker = (player, row, col) => {
    if (board[row][col].getValue() != 0) {
      console.log("Case déjà occupé");
      return false;
    }

    board[row][col].setValue(player.marker);
    return true;
  };

  // 4. Je vérifie si le jeu est terminé
  const isGameOver = () => {
    return board.every((row) => {
      return row.every((col) => col.getValue() != 0);
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

// 2. Je créer les joueurs
// Mon objet qui crée les joueurs
const player = (marker) => {
  let score = 0;

  const getScore = () => score;
  const addScore = () => score++;

  return { marker, getScore, addScore };
};

const j1 = player("X");

// Objet qui controle le flux du jeu
const game = (board, player) => {
  let nberOfMarkers = 0;
  let row = 0;
  let column = 0;

  board.forEach((row) =>
    row.forEach((col) => {
      if (col.getValue() != 0) {
        nberOfMarkers++;
        console.log(nberOfMarkers);
      }
    }),
  );

  if (nberOfMarkers >= 5) {
    if (gameBoard.isWinner(player)) {
      console.log(`Nous avons un gagnant, le joueur ${player.marker} a gagné`);
    }
  }

  if (gameBoard.isGameOver()) {
    console.log("C'est une égalité");
  }

  boardContainer.addEventListener("click", (e) => {
    let target = e.target;

    if (target.classList == "row" || target.classList == "col") {
      row = target.dataset.row;
      column = target.dataset.col;
      gameBoard.placeMarker(player, row, column);
      displayGame().hideBoard();
      displayGame().displayBoard(gameBoard.getBoard());
      console.log(`row ${row}, col ${column}`);
    }
  });
};

// 6. créer l'objet qui affiche la grille
const displayGame = () => {
  const displayBoard = (board) => {
    const visualBoard = board
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

  return { displayBoard, hideBoard };
};

displayGame().displayBoard(gameBoard.getBoard());

// Fonction pour créer une cellule
function cell() {
  let value = 0;

  const setValue = (val) => {
    value = val;
  };
  const getValue = () => value;

  return { setValue, getValue };
}
