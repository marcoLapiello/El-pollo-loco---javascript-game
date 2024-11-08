let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", keyboardInputsTrue);

function keyboardInputsTrue(event) {
  if (event.key == "ArrowUp") {
    keyboard.UP = true;
  } else if (event.key == "ArrowDown") {
    keyboard.DOWN = true;
  } else if (event.key == "ArrowLeft") {
    keyboard.LEFT = true;
  } else if (event.key == "ArrowRight") {
    keyboard.RIGHT = true;
  } else if (event.key == " ") {
    keyboard.SPACE = true;
  }
}

window.addEventListener("keyup", keyboardInputsFalse);

function keyboardInputsFalse(event) {
  if (event.key == "ArrowUp") {
    keyboard.UP = false;
  } else if (event.key == "ArrowDown") {
    keyboard.DOWN = false;
  } else if (event.key == "ArrowLeft") {
    keyboard.LEFT = false;
  } else if (event.key == "ArrowRight") {
    keyboard.RIGHT = false;
  } else if (event.key == " ") {
    keyboard.SPACE = false;
  }
}
