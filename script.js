let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;
let turnO = true;
let colorChange;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  boxes[colorChange[0]].style.backgroundColor = "#ffffc7";
  boxes[colorChange[1]].style.backgroundColor = "#ffffc7";
  boxes[colorChange[2]].style.backgroundColor = "#ffffc7";
  // removeWinningLine();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      box.innerHTML = "<span style='color:#FFA3A5;'>O</span>";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      box.innerHTML = "<span style='color: black;'>X</span>";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations,winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  // addWinningLine(winningPattern);
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        new Promise((resolve) => {
          boxes[pattern[0]].style.backgroundColor = "#94524A";
          boxes[pattern[1]].style.backgroundColor = "#94524A";
          boxes[pattern[2]].style.backgroundColor = "#94524A";
          setTimeout(resolve, 1100);
        }).then(() => showWinner(pos1Val));
        colorChange = pattern;

        return true;
      }
    }
  }
};

// const addWinningLine = (winningPattern) => {
//   winningPattern.forEach((index) => {
//     boxes[index].classList.add("winning-line");
//   });
// };

// const removeWinningLine = () => {
//   boxes.forEach((box) => {
//     box.classList.remove("winning-line");
//   });
// };

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
