let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Pattern Array
let winningPattern = [
   [0, 1, 2],
   [0, 3, 6],
   [2, 5, 8],
   [6, 7, 8],
   [3, 4, 5],
   [1, 4, 7],
   [0, 4, 8],
   [2, 4, 6],
];

// Player 'X' play first
let xTurn = true;
let count = 0;

// Disable All Buttons
const disableButtons = () => {
   btnRef.forEach((element) => (element.disabled = true));
   // Enable popup
   popupRef.classList.remove("hide");
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
   btnRef.forEach((element) => {
      element.innerText = "";
      element.disabled = false;
   });
   // Disable popup
   popupRef.classList.add("hide");
};

// Player Wins Function
const winFunction = (letter) => {
   disableButtons();
   if (letter == "X") {
      msgRef.innerHTML = "Player 'X' Wins!";
   }
   else {
      msgRef.innerHTML = "Player 'O' Wins!";
   }
};

// Function for Draw
const drawFunction = () => {
   disableButtons();
   msgRef.innerHTML = "Draw!";
};

// New Game
newgameBtn.addEventListener("click", () => {
   count = 0;
   enableButtons();
});
restartBtn.addEventListener("click", () => {
   count = 0;
   enableButtons();
});

// Win Logic
const winChecker = () => {
   // Loop through all win patterns
   for (let i of winningPattern) {
      let [element1, element2, element3] = [
         btnRef[i[0]].innerText,
         btnRef[i[1]].innerText,
         btnRef[i[2]].innerText,
      ];
      // Check if elements are filled
      // If 3 empty elements are same and would give win
      if (element1 != "" && (element2 != "") && (element3 != "")) {
         if (element1 == element2 && element2 == element3) {
            //If all 3 button have same values then the value to winFunction
            winFunction(element1);
         }
      }
   }
};

// Display X/O on click
btnRef.forEach((element) => {
   element.addEventListener("click", () => {
      if (xTurn) {
         xTurn = false;
         // Display X
         element.innerText = "X";
         element.disabled = true;
      }
      else {
         xTurn = true;
         // Display O
         element.innerText = "O";
         element.disabled = true;
      }

      // Increment count on each click
      count += 1;
      if (count == 9) {
         drawFunction();
      }

      // Check on win every click
      winChecker();
   });
});

// Enable Buttons & Disable Popup
window.onload = enableButtons();
