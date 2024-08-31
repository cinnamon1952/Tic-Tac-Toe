function openPlayerConfig(event) {
  editPlayer = +event.target.dataset.playerid; //+"1" => 1
  configOverlay.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  configOverlay.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  noNameError.textContent = "";
  document.getElementById("player-name").value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const playerName = formData.get("playername").trim();

  if (!playerName) {
    event.target.firstElementChild.classList.add("error");
    noNameError.textContent = "Please Enter a Valid Name!";
    return;
  }

  const updatedPlayerData = document.getElementById(
    "player-" + editPlayer + "-data"
  );
  updatedPlayerData.children[1].textContent = playerName;

  players[editPlayer - 1].name = playerName;

  closePlayerConfig();
}
