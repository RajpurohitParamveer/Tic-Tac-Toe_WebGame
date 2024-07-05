// Selecting all the boxes, reset button, new game button, message, and message container
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgcontainer = document.querySelector(".msg-container");

let turnO = true; // Game starts with player O
let count = 0; // To track the number of turns and detect a draw

// Winning patterns represented as arrays of indices
const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to reset the game
const resetGame = () => {
  turnO = true;
  count = 0;
  enabledbox();
  msgcontainer.classList.add("hide");
};

// Adding click event listeners to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Print O or X depending on the current turn
    if (turnO === true) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; // Disable the box after a turn
    count++;

    // Check for a winner
    let isWinner = checkWinner();

    // If all boxes are filled and there is no winner, it's a draw
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Function to handle a draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgcontainer.classList.remove("hide");
  disabledbox();
};

// Function to disable all boxes
const disabledbox = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes and clear their text
const enabledbox = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Function to show the winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations!!!, Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disabledbox();
};

// Function to check if there is a winner
const checkWinner = () => {
  for (let patterns of winningPatterns) {
    let pos1val = boxes[patterns[0]].innerText;
    let pos2val = boxes[patterns[1]].innerText;
    let pos3val = boxes[patterns[2]].innerText;

    // Check if the values in the pattern are the same and not empty
    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
        return true;
      }
    }
  }
};

// Adding event listeners to reset and new game buttons
newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
