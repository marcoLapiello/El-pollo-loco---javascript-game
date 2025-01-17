import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";
import { SoundManager } from "./managers/soundManager.class.js";

let canvas;
let world;
let gameIsStarted = false;
let keyboard = new Keyboard();
let soundManager = new SoundManager();
let imprintOpen = false;

soundManager.registerSound("walk", new Audio("./audio/running.wav"));
soundManager.registerSound("jump", new Audio("./audio/breath_jump.wav"));
soundManager.registerSound("hurt", new Audio("./audio/man-hurt.mp3"), 0.5);
soundManager.registerSound("dies", new Audio("./audio/man-dies.wav"), 0.5);
soundManager.registerSound("chickenDies", new Audio("./audio/splatting_chicken.wav"));
soundManager.registerSound("bossDies", new Audio("./audio/boss_dies.wav"), 0.5);
soundManager.registerSound("bossAttacks", new Audio("./audio/boss_attacks.wav"));
// soundManager.registerSound("gameSound-chickens", new Audio("./audio/chicken_comes_closer.mp3"), 0.5);
soundManager.registerSound("gameSound-music", new Audio("./audio/game-music2.m4a"), 0.3);
soundManager.registerSound("win", new Audio("./audio/win.mp3"), 0.5);
soundManager.registerSound("lost", new Audio("./audio/lost.wav"), 0.5);
soundManager.registerSound("collectCoin", new Audio("./audio/coin.wav"));

export { soundManager };

export function startGame() {
  gameIsStarted = true;
  document.getElementById("startScreen").classList.add("dNone");
  document.getElementById("canvas").classList.remove("dNone");
  document.getElementById("pauseBtn").classList.remove("dNone");
  document.getElementById("soundBtn").classList.remove("dNone");
  init();
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, gameIsStarted);
}

document.getElementById("menuBtn").addEventListener("click", openMenu);

function openMenu() {
  document.getElementById("menu").classList.remove("dNone");
  document.getElementById("menu").classList.add("opacity");
}

document.getElementById("menuBackBtn").addEventListener("click", closeMenu);

function closeMenu() {
  document.getElementById("menu").classList.add("dNone");
  document.getElementById("menu").classList.remove("opacity");
}

// document.getElementById("menuImprintBtn").addEventListener("click", toggleImprint);

// function toggleImprint() {
//   imprintOpen = !imprintOpen;

//   if (imprintOpen) {
//     document.getElementById("descriptionTitle").innerHTML = "";
//     document.getElementById("descriptionText").innerHTML = "";
//     document.getElementById("gameDescription").innerHTML = getImprintTemplate();
//   } else {
//     document.getElementById("gameDescription").innerHTML = "";
//     document.getElementById("gameDescription").innerHTML = getDescriptionTemplate();
//   }
// }

// function getImprintTemplate() {
//   return /*html*/ `
//     <h2>IMPRINT</h2>

//     <p>
//       <span>Marco Lapiello</span>
//       <span>Hohenaustra&szlig;e 4</span>
//       <span>77815 Bühl, Deutschland</span>
//     </p>

//     <h3>Contact</h3>
//     <p>
//       <span>Phone:</span>
//       <span>+49 (0) 174 65 02 529</span>
//     </p>
//     <p>
//       <span>E-Mail:</span>
//       <span>hello&#64;marco-lapiello-developer.com</span>
//     </p>

//     <p>Source: <a href="https://www.e-recht24.de">e-recht24.de</a></p>

//   `;
// }

// function getDescriptionTemplate() {
//   return /*html*/ `
//     <h2 id="descriptionTitle">WHAT´S GOING ON??</h2>
//             <span id="descriptionText" class="gameDescription">
//               A horde of angry chickens, led by their alpha rooster, is advancing toward your ranch with the aim of pillaging it. Block their path and
//               defeat them with blasts of spicy salsa!
//             </span>
//   `;
// }

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
