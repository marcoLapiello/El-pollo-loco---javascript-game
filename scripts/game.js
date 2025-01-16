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
soundManager.registerSound("hurt", new Audio("./audio/man-hurt.mp3"), 0.5);
soundManager.registerSound("dies", new Audio("./audio/man-dies.wav"), 0.5);
soundManager.registerSound("chickenDies", new Audio("./audio/splatting_chicken.wav"));
soundManager.registerSound("bossDies", new Audio("./audio/boss_dies.wav"), 0.5);
soundManager.registerSound("bossAttacks", new Audio("./audio/boss_attacks.wav"));
soundManager.registerSound("gameSound-chickens", new Audio("./audio/chicken_comes_closer.mp3"), 0.5);
soundManager.registerSound("gameSound-music", new Audio("./audio/game-music.mp3"), 0.3);
soundManager.registerSound("win", new Audio("./audio/win.mp3"), 0.5);
soundManager.registerSound("lost", new Audio("./audio/lost.wav"), 0.5);
soundManager.registerSound("collectCoin", new Audio("./audio/coin.wav"));

export { soundManager };

export function startGame() {
  gameIsStarted = true;
  document.getElementById("startScreen").classList.add("dNone");
  document.getElementById("canvasContainer").classList.remove("dNone");
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