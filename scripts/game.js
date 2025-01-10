// Importa tutti i moduli
import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";
import { intervalManager } from "./managers/intervalManager.class.js";
import { InputHandler } from "./managers/inputHandler.class.js";
import { stateManager } from "./managers/stateManager.class.js";

let canvas;
let world;
let gameIsStarted = false;
let keyboard = new Keyboard();

export function startGame() {
  gameIsStarted = true;
  document.getElementById("startScreen").classList.add("dNone");
  document.getElementById("canvas").classList.remove("dNone");
  init();
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, gameIsStarted);
}

window.addEventListener("keydown", keyboardInputsTrue);

function keyboardInputsTrue(event) {
  if (event.code == "ArrowLeft") {
    keyboard.LEFT = true;
  } else if (event.code == "ArrowRight") {
    keyboard.RIGHT = true;
  } else if (event.code == "Space") {
    keyboard.SPACE = true;
  } else if (event.code == "KeyB") {
    keyboard.B = true;
  }
}

window.addEventListener("keyup", keyboardInputsFalse);

function keyboardInputsFalse(event) {
  if (event.code == "ArrowLeft") {
    keyboard.LEFT = false;
  } else if (event.code == "ArrowRight") {
    keyboard.RIGHT = false;
  } else if (event.code == "Space") {
    keyboard.SPACE = false;
  } else if (event.code == "KeyB") {
    keyboard.B = false;
  }
}

document.getElementById("startButton").addEventListener("click", startGame);
