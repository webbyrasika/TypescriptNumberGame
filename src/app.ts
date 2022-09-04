let randomNumber: number = Math.floor(Math.random() * 100) + 1;
// console.log(randomNumber);
const guesses = document.querySelector(".guesses") as HTMLElement;
// console.log(guesses);
const lastResult = document.querySelector<HTMLElement>(".lastResult");
const lowOrHi = document.querySelector<HTMLElement>(".lowOrHi");

const guessSubmit = document.querySelector<HTMLInputElement>(
  ".guessSubmit"
) as HTMLInputElement;
const guessField = document.querySelector<HTMLInputElement>(".guessField");
// console.log(guessField);

let guessCount = 1;
// console.log(guessCount);
let resetButton: HTMLButtonElement;

function checkGuess() {
  if (guessField == null || lowOrHi == null || lastResult == null) return;
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }
  guesses.textContent += userGuess + " ";

  if (userGuess === randomNumber && lastResult != null) {
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = "green";
    lastResult.style.color = "white";
    lowOrHi.textContent = "";
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!GAME OVER!!!";
    setGameOver();
  } else {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Last guess was too low!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high!";
    }
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
  (guessField as HTMLInputElement).disabled = true;
  (guessSubmit as HTMLInputElement).disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  // resetButton.style.backgroundColor = "green";
  document.body.appendChild(resetButton);
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  if (guessField == null) return;
  guessCount = 1;
  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }
  if (resetButton.parentNode != null)
    resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();
  if (lastResult != null) lastResult.style.backgroundColor = "white";

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
