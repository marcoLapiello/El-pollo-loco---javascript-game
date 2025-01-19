import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";
import { SoundManager } from "./managers/soundManager.class.js";
import { getDescriptionTemplate, getControlsTemplate, getImprintTemplate } from "./menuTemplate.js";

let canvas;
let world;
let gameIsStarted = false;
let keyboard = new Keyboard();
let soundManager = new SoundManager();
let imprintOpen = false;

document.addEventListener("DOMContentLoaded", init);

function init() {
  registerEventsListeners();
  registerSounds();
  loadMenu();
}

function registerEventsListeners() {
  document.getElementById("menuBtn").addEventListener("click", toggleMenu);
  document.getElementById("menuBackBtn").addEventListener("click", toggleMenu);
  document.getElementById("menuImprintBtn").addEventListener("click", toggleImprint);
  window.addEventListener("keydown", keyboardInputsTrue);
  window.addEventListener("keyup", keyboardInputsFalse);
  document.getElementById("startButton").addEventListener("click", startGame);
  document.getElementById("resetButton").addEventListener("click", () => {
    location.reload();
  });
}

function registerSounds() {
  soundManager.registerSound("walk", new Audio("./audio/running.wav"));
  soundManager.registerSound("jump", new Audio("./audio/breath_jump.wav"));
  soundManager.registerSound("hurt", new Audio("./audio/man-hurt.mp3"), 0.5);
  soundManager.registerSound("dies", new Audio("./audio/man-dies.wav"), 0.5);
  soundManager.registerSound("chickenDies", new Audio("./audio/splatting_chicken.wav"));
  soundManager.registerSound("bossDies", new Audio("./audio/boss_dies.wav"), 0.5);
  soundManager.registerSound("bossAttacks", new Audio("./audio/boss_attacks.wav"));
  soundManager.registerSound("gameSound-music", new Audio("./audio/game-music2.m4a"), 0.3);
  soundManager.registerSound("won", new Audio("./audio/win.mp3"), 0.5);
  soundManager.registerSound("lost", new Audio("./audio/lost.wav"), 0.5);
  soundManager.registerSound("collectCoin", new Audio("./audio/coin.wav"));
}
export { soundManager };

function loadMenu() {
  if (!imprintOpen) {
    document.getElementById("menuImprintBtn").innerText = "";
    document.getElementById("menuImprintBtn").innerText = "Imprint";
    document.getElementById("gameDescription").innerHTML = "";
    document.getElementById("controls").innerHTML = "";
    document.getElementById("gameDescription").innerHTML = getDescriptionTemplate();
    document.getElementById("controls").innerHTML = getControlsTemplate();
  } else {
    document.getElementById("menuImprintBtn").innerText = "";
    document.getElementById("menuImprintBtn").innerText = "Description";
    document.getElementById("controls").innerHTML = "";
    document.getElementById("gameDescription").innerHTML = "";
    document.getElementById("gameDescription").innerHTML = getImprintTemplate();
  }
}

export function startGame() {
  gameIsStarted = true;
  document.getElementById("startScreen").classList.add("dNone");
  document.getElementById("canvas").classList.remove("dNone");
  document.getElementById("pauseBtn").classList.remove("dNone");
  document.getElementById("soundBtn").classList.remove("dNone");
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, gameIsStarted);
}

function toggleMenu() {
  let menuRef = document.getElementById("menu");
  if (imprintOpen) {
    imprintOpen = false;
    loadMenu();
  }
  if (menuRef.classList.contains("dNone")) {
    menuRef.classList.remove("dNone");
  } else {
    menuRef.classList.add("dNone");
  }
}

function toggleImprint() {
  imprintOpen = !imprintOpen;
  loadMenu();
}

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


// MOBILE DEVICE DETECTION

// document.addEventListener("DOMContentLoaded", function() {
//   console.log("DOM fully loaded and parsed");
//   if (isMobileDevice()) {
//     console.log("Mobile device detected");
//     checkOrientation();
//     window.addEventListener("orientationchange", checkOrientation);
//     window.addEventListener("resize", checkOrientation);
//   } else {
//     console.log("Not a mobile device");
//   }
// });

// function isMobileDevice() {
//   const isMobile = /Mobi|Android/i.test(navigator.userAgent);
//   console.log("isMobileDevice:", isMobile);
//   return isMobile;
// }

// function checkOrientation() {
//   console.log("Checking orientation");
//   if (window.innerHeight > window.innerWidth) {
//     console.log("Portrait mode detected");
//     showLandscapeWarning();
//   } else {
//     console.log("Landscape mode detected");
//     hideLandscapeWarning();
//   }
// }

// function showLandscapeWarning() {
//   let warning = document.getElementById("landscapeWarning");
//   if (!warning) {
//     console.log("Showing landscape warning");
//     warning = document.createElement("div");
//     warning.id = "landscapeWarning";
//     warning.style.position = "fixed";
//     warning.style.top = "0";
//     warning.style.left = "0";
//     warning.style.width = "100%";
//     warning.style.height = "100%";
//     warning.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
//     warning.style.color = "white";
//     warning.style.display = "flex";
//     warning.style.alignItems = "center";
//     warning.style.justifyContent = "center";
//     warning.style.zIndex = "1000";
//     warning.innerText = "Please rotate your device to landscape mode to play the game.";
//     document.body.appendChild(warning);
//   }
// }

// function hideLandscapeWarning() {
//   const warning = document.getElementById("landscapeWarning");
//   if (warning) {
//     console.log("Hiding landscape warning");
//     warning.remove();
//   }
// }
