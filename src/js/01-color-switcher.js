const body = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let timerId = null;

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
  startButton.disabled = true;
  stopButton.disabled = false;
  timerId = setInterval(changeBodyColor, 1000);
}

function onStopButtonClick() {
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(timerId);
}

function changeBodyColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
