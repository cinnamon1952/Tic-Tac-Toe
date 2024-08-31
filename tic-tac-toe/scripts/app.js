gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameisOver = false;

const players = [
  { name: "", Symbol: "X" },
  { name: "", Symbol: "O" },
];

const configOverlay = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const noNameError = document.getElementById("config-errors");
const gameArea = document.getElementById("active-game");
const activePlayerName = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");

const editPlayer1 = document.getElementById("edit-player1");
const editPlayer2 = document.getElementById("edit-player2");
const cancelConfig = document.getElementById("cancel-config");
const startGame = document.getElementById("start-game");
const gameFieldElements = document.querySelectorAll("#game-board li");

editPlayer1.addEventListener("click", openPlayerConfig);
editPlayer2.addEventListener("click", openPlayerConfig);

cancelConfig.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startGame.addEventListener("click", startNewGame);

for (const gameFieldElement of gameFieldElements) {
  gameFieldElement.addEventListener("click", selectGameField);
}
