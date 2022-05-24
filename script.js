let player1;
let player2;
let isPlayer1 = false;

const currentPlayerHTML = document.getElementById("currentPlayer");
const playersNameHTML = document.getElementById("players");
const form1 = document.getElementById("form1");
const form2 = document.getElementById("form2");
const gameButtonWrapper = document.getElementById("game-button-wrapper");
const gameBoard = document.getElementById("gameBoard");

//function for form to display player 1 and 2
function showOne(event) {
  event.preventDefault();
  const form = event.target;
  player1 = form.player1.value;
  playersNameHTML.innerHTML = player1 + "=X";
  form.classList.add("submitted");
}

function showTwo(event) {
  event.preventDefault();
  const form = event.target;
  player2 = form.player2.value;
  playersNameHTML.innerHTML += " " + player2 + "=O";
  form.classList.add("submitted");
}
// start game // using randomizer and from player 1 to player 2
function startGame() {
  const number = Math.ceil(Math.random() * 2);
  if (number === 1) {
    isPlayer1 = true;
    currentPlayerHTML.innerHTML = "Player " + player1;
  } else {
    currentPlayerHTML.innerHTML = "Player " + player2;
  }
  gameButtonWrapper.classList.add("submitted");
}
// display winner player 1 or player 2
function onWins() {
  if (isPlayer1) {
    currentPlayerHTML.innerHTML = player1 + " " + "Player 1 has won!";
  } else {
    currentPlayerHTML.innerHTML = player2 + " " + "Player 2 has won!";
  }
  alert("You have won!");
}
// checking winning combinations using for loop to check each tic tac toe box

function checkWins(symbol = "X") {
  const boxes = gameBoard.children;
  let isDraw = true;
  for (let i = 0; i < boxes.length; i++) {
    const boxSymbol = boxes[i].innerHTML;
    if (boxSymbol === "") isDraw = false;
    try {
      if (boxSymbol === symbol) {
        if (
          i % 3 === 0 &&
          boxes[i + 1].innerHTML === symbol &&
          boxes[i + 2].innerHTML === symbol
        )
          return onWins();
        else if (
          i < 3 &&
          boxes[i + 3].innerHTML === symbol &&
          boxes[i + 6].innerHTML === symbol
        )
          return onWins();
        else if (
          i === 0 &&
          boxes[4].innerHTML === symbol &&
          boxes[8].innerHTML === symbol
        )
          return onWins();
        else if (
          i === 2 &&
          boxes[4].innerHTML === symbol &&
          boxes[6].innerHTML === symbol
        )
          return onWins();
      }
    } catch (err) {}
  }
  if (isDraw) {
    alert("Game was a draw! Press Reset Game Buttom");
    currentPlayerHTML.innerHTML = "Game was a draw!";
  }
}

// go through each box to confirm if box is Empty, X, or O
function selectedBox(event) {
  const box = event.target;
  if (box.innerHTML === "") {
    if (isPlayer1) {
      box.innerHTML = "X";
      currentPlayerHTML.innerHTML = "Player " + player2;
      checkWins("X");
    } else {
      box.innerHTML = "O";
      currentPlayerHTML.innerHTML = "Player " + player1;
      checkWins("O");
    }
    isPlayer1 = !isPlayer1;
  }
}
// reset game without refresh button //
// clear forms players name and bord
//
function resetgame() {
  form1.classList.remove("submitted");
  form2.classList.remove("submitted");
  gameButtonWrapper.classList.remove("submitted");
  playersNameHTML.innerHTML = "";
  currentPlayerHTML.innerHTML = "";
  for (let i = 0; i < gameBoard.children.length; i++) {
    gameBoard.children[i].innerHTML = "";
  }
}
