function resetGame() {
  activePlayer = 0;
  currentRound = 1;
  gameisOver = false;
  gameOverElement.firstElementChild.innerHTML =
    "You won, <span id='winner'>PLAYER NAME</span>!";
  gameOverElement.style.display = "none";

  let gameFieldIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      gameFieldElements[gameFieldIndex].textContent = "";
      gameFieldElements[gameFieldIndex].classList.remove("disabled");
      gameFieldIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please Enter Names for Both Players!");
    return;
  }

  resetGame();

  activePlayerName.textContent = players[activePlayer].name;
  gameArea.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (gameisOver) {
    return;
  }

  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("This Field is Already Taken!");
    return;
  }

  selectedField.textContent = players[activePlayer].Symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winner = gameOver();

  if (winner !== 0) {
    endGame(winner);
  }

  currentRound++;

  switchPlayer();
}

function gameOver() {
  // Check for a winner in the rows
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // Check for a winner in the columns
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Check for a winner in the diagonal top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  // Check for a winner in the diagonal top right to bottom left
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winner) {
  gameisOver = true;
  gameOverElement.style.display = "block";

  if (winner > 0) {
    const winnerName = players[winner - 1].name;
    document.getElementById("winner").textContent = winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a Draw!";
  }
}
