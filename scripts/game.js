// Importa tutti i moduli
import { World } from './models/world.class.js';
import { Keyboard } from './models/keyboard.class.js';
import { intervalManager } from './managers/intervalManager.class.js';
import { InputHandler } from './managers/inputHandler.class.js';
import { stateManager } from './managers/stateManager.class.js';


// Variabili globali
let canvas;
let world;
let gameIsStarted = false;
// const inputHandler = new InputHandler();
let keyboard = new Keyboard();

// Funzione per avviare il gioco
export function startGame() {
  gameIsStarted = true;
  document.getElementById("startScreen").classList.add("dNone");
  document.getElementById("canvas").classList.remove("dNone");
  init();
}

// Funzione di inizializzazione
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, gameIsStarted); // Passa tutte le dipendenze necessarie
}

window.addEventListener("keydown", keyboardInputsTrue);

function keyboardInputsTrue(event) {
  if (event.code == "ArrowUp") {
    keyboard.UP = true;
  } else if (event.code == "ArrowDown") {
    keyboard.DOWN = true;
  } else if (event.code == "ArrowLeft") {
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
  if (event.code == "ArrowUp") {
    keyboard.UP = false;
  } else if (event.code == "ArrowDown") {
    keyboard.DOWN = false;
  } else if (event.code == "ArrowLeft") {
    keyboard.LEFT = false;
  } else if (event.code == "ArrowRight") {
    keyboard.RIGHT = false;
  } else if (event.code == "Space") {
    keyboard.SPACE = false;
  } else if (event.code == "KeyB") {
    keyboard.B = false;
  }
}

// Associa il pulsante Start all'avvio del gioco
document.getElementById("startButton").addEventListener("click", startGame);
