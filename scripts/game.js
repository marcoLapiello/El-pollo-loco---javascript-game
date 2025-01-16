import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";
import { SoundManager } from "./managers/soundManager.class.js";

let canvas;
let world;
let gameIsStarted = false;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

soundManager.registerSound("walk", new Audio("./audio/running.wav"));
soundManager.registerSound("jump", new Audio("./audio/breath_jump.wav"));
soundManager.registerSound("hurt", new Audio("./audio/man-hurt.mp3"));
soundManager.registerSound("dies", new Audio("./audio/man-dies.wav"));
soundManager.registerSound("chickenDies", new Audio("./audio/splatting_chicken.wav"));
soundManager.registerSound("bossDies", new Audio("./audio/boss_dies.wav"));
soundManager.registerSound("bossAttacks", new Audio("./audio/boss_attacks.wav"));

export { soundManager };

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

document.getElementById("resetButton").addEventListener("click", () => {
  location.reload();
});