"use strict";

const unicorn = document.getElementById("unicorn");
const palm = document.getElementById("palm");
const gameOverModal = document.querySelector(".game-over-modal");
const btnGoAgain = document.querySelector(".btn");
const overlay = document.querySelector(".overlay");
const currentJumps = document.querySelector(".current-jumps-score");
const highScore = document.querySelector(".jump-score");

//Start Game
let jumps = 0;
let highScoreTotal = 0;

//STOP SPACE SCROLL
window.onkeydown = function (e) {
  return !(e.keyCode == 32);
};

let initialize = function () {
  jumps = 0;

  gameOverModal.classList.add("hidden");
  overlay.classList.add("hidden");
  palm.classList.add("run-animation");
  currentJumps.textContent = 0;
  highScore.textContent = highScoreTotal;
};
initialize();

//JUMP Key
function jump() {
  if (unicorn.classList != "jump") {
    //add class to unicorn
    unicorn.classList.add("jump");
    //timer to remove class so it can jump again
    setTimeout(function () {
      unicorn.classList.remove("jump");
    }, 300);
  }
}

//HIGHSCORE = CURRENT JUMPS + HIGHSCORE
const highScoreCalc = function () {
  if (jumps > highScoreTotal) {
    highScoreTotal = jumps;
    highScore.textContent = highScoreTotal;
  }
};

//GAME OVER MODAL WINDOW
let gameOverWindow = function () {
  palm.classList.remove("run-animation");
  gameOverModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//CHECK IF UNICORN IS ALIVE
let isAlive = setInterval(function () {
  //check position of unicorn and palm and see if they interfere

  let unicornTop = parseInt(
    window.getComputedStyle(unicorn).getPropertyValue("top")
  );
  console.log(unicornTop); //check y position of unicorn

  let palmLeft = parseInt(
    window.getComputedStyle(palm).getPropertyValue("left")
  );
  console.log(palmLeft); //get paln left (x) position

  //collision detection
  if (palmLeft < 30 && palmLeft > 0 && unicornTop >= 120) {
    //collision
    // alert(`Game over! Wah-wah!`);
    //INSTEAD, I want a window with a restart button that refreshed
    gameOverWindow();
    highScoreCalc();
  }
}, 10);

//EVENT LISTENER - SPACE KEY = JUMP
document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    jump();
    jumps++;
    currentJumps.textContent = jumps;
  } else {
    alert(`Press your spacebar to jump.`);
  }
});

//WHOLE BODY CLICK JUMP (hopefully for mobile)
document.body.onclick = function () {
  jump();
  jumps++;
  currentJumps.textContent = jumps;
};

//EVENT LISTENER - RESET GAME
btnGoAgain.addEventListener("click", initialize);
/*
btnGoAgain.addEventListener("click", function () {
  gameOverModal.classList.add("hidden");
  overlay.classList.add("hidden");
  palm.classList.add("run-animation");
  currentJumps.textContent = 0;
});*/
//can i make a jump counter?
//record current score and high score for the most jumps?
