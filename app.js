//Agregar score mas alto con local Storage
// Aumentar score cuando salta

const ball = document.getElementById("ball");
const dune = document.getElementById("dune");

const body = document.querySelector("body");
// Modal elements
const endGameMessage = document.getElementById("end-game-message");
const restart = document.getElementById("restart");
const score = document.getElementById("score");
const finalScore = document.getElementById("final-score");

let flagRestart = false;
let startTime = null;
let intervalLooser = null;
let intervalScore = null;

// Ball jumping
function jump (e){
  // If arrow up is press add jump class
  if(e.keyCode == '38'){
    ball.classList.add("jump");
    setTimeout(() => {
      // Remove jump effect after n time
      ball.classList.remove("jump");
    }, 600);
  }
}

// Restart game
function restartGame(){
  flagRestart = true;
  dune.style.animationPlayState = "initial";
  ball.style.animationPlayState = "initial";
  endGameMessage.classList.remove("show");
  flagRestart = false;
  init();
  
}

// Activate interval
function init(){
  startTime = Date.now();
  intervalScore = setInterval(checkScore, 100);
  intervalLooser = setInterval(checkLooser, 30);
}


// Event listeners
document.addEventListener("DOMContentLoaded", init);
// Event click listener for ball jumping
body.addEventListener("keydown", jump);

// Event click listener to restart game
restart.addEventListener("click", restartGame);

// Check end game
function checkLooser(){
  let ballBottom = parseInt(window.getComputedStyle(ball).getPropertyValue("bottom"));
  let duneLeft = parseInt(window.getComputedStyle(dune).getPropertyValue("left"));

  // Check if ball and dune are in the same position: top or left. One over another.
  if((duneLeft>0 && duneLeft<60) && ballBottom<=65 && (!flagRestart) ){
    clearInterval(intervalLooser);
    clearInterval(intervalScore);
    dune.style.animationPlayState = "paused";
    ball.style.animationPlayState = "paused";
    endGameMessage.classList.add("show");
    finalScore.textContent = score.textContent;
  }
}

function checkScore(){
  scoreTime = Date.now() - startTime;
  score.textContent = (scoreTime/500).toFixed(0);
}