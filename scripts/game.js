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

/**
 * Initializes the game by registering event listeners, sounds, and loading the menu.
 */
function init() {
  registerEventsListeners();
  registerSounds();
  loadMenu();
}

/**
 * Registers all necessary event listeners for the game.
 */
function registerEventsListeners() {
  document.getElementById("menuBtn").addEventListener("click", toggleMenu);
  document.getElementById("menuBackBtn").addEventListener("click", toggleMenu);
  document.getElementById("menuImprintBtn").addEventListener("click", toggleImprint);
  window.addEventListener("keydown", keyboardInputsTrue);
  window.addEventListener("keyup", keyboardInputsFalse);
  window.addEventListener("touchstart", touchInputsTrue);
  window.addEventListener("touchend", touchInputsFalse);
  document.getElementById("startButton").addEventListener("click", startGame);
  // document.getElementById("resetButton").addEventListener("click", () => {console.log("reset Game")});
}

/**
 * Registers all game sounds with the sound manager.
 */
function registerSounds() {
  soundManager.registerSound("walk", new Audio("./audio/running.wav"));
  soundManager.registerSound("jump", new Audio("./audio/breath_jump.wav"));
  soundManager.registerSound("hurt", new Audio("./audio/man-hurt.mp3"), 0.5);
  soundManager.registerSound("dies", new Audio("./audio/man-dies.wav"), 0.5);
  soundManager.registerSound("snort", new Audio("./audio/man-snort.mp3"), 0.3);
  soundManager.registerSound("chickenDies", new Audio("./audio/splatting_chicken.wav"));
  soundManager.registerSound("bossDies", new Audio("./audio/boss_dies.wav"), 0.5);
  soundManager.registerSound("bossHurt", new Audio("./audio/boss_hurt.wav"));
  soundManager.registerSound("bossAttacks", new Audio("./audio/boss_attacks.wav"));
  soundManager.registerSound("gameSound-music", new Audio("./audio/game-music2.m4a"), 0.3);
  soundManager.registerSound("won", new Audio("./audio/win.mp3"), 0.5);
  soundManager.registerSound("lost", new Audio("./audio/lost.wav"), 0.5);
  soundManager.registerSound("collectCoin", new Audio("./audio/coin.wav"));
}
export { soundManager };

/**
 * Loads the game menu, switching between description and imprint views.
 */
function loadMenu() {
  const imprintBtn = document.getElementById("menuImprintBtn");
  const gameDescription = document.getElementById("gameDescription");
  const controls = document.getElementById("controls");

  if (!imprintOpen) {
    imprintBtn.innerText = "Imprint";
    gameDescription.innerHTML = getDescriptionTemplate();
    controls.innerHTML = isMobileDevice() ? "" : getControlsTemplate();
    controls.classList.toggle("dNone", isMobileDevice());
  } else {
    imprintBtn.innerText = "Description";
    gameDescription.innerHTML = getImprintTemplate();
    controls.innerHTML = "";
  }
}

/**
 * Starts the game by initializing the world and updating the UI.
 */
export function startGame() {
  gameIsStarted = true;
  document.getElementById("startScreen").classList.add("dNone");
  document.getElementById("canvas").classList.remove("dNone");
  document.getElementById("pauseBtn").classList.remove("dNone");
  document.getElementById("soundBtn").classList.remove("dNone");
  document.getElementById("menuBtn").classList.add("dNone");
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, gameIsStarted);
  if (isMobileDevice()) {
    toggleMobileBtns("show");
  }
}

/**
 * Toggles the visibility of the game menu.
 */
function toggleMenu() {
  let menuRef = document.getElementById("menu");
  if (imprintOpen) {
    imprintOpen = false;
    loadMenu();
  }
  menuRef.classList.toggle("dNone");
}

/**
 * Toggles the imprint view in the menu.
 */
function toggleImprint() {
  imprintOpen = !imprintOpen;
  loadMenu();
}

/**
 * Handles keyboard input events to set the corresponding keys to true.
 * @param {KeyboardEvent} event - The keyboard event.
 */
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

/**
 * Handles keyboard input events to set the corresponding keys to false.
 * @param {KeyboardEvent} event - The keyboard event.
 */
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

/**
 * Handles touch input events to set the corresponding keys to true.
 * @param {TouchEvent} event - The touch event.
 */
function touchInputsTrue(event) {
  if (event.target.id == "leftBtn") {
    keyboard.LEFT = true;
  } else if (event.target.id == "rightBtn") {
    keyboard.RIGHT = true;
  } else if (event.target.id == "jumpBtnRight" || event.target.id == "jumpBtnLeft") {
    keyboard.SPACE = true;
  } else if (event.target.id == "throwBtnRight" || event.target.id == "throwBtnLeft") {
    keyboard.B = true;
  }
}

/**
 * Handles touch input events to set the corresponding keys to false.
 * @param {TouchEvent} event - The touch event.
 */
function touchInputsFalse(event) {
  if (event.target.id == "leftBtn") {
    keyboard.LEFT = false;
  } else if (event.target.id == "rightBtn") {
    keyboard.RIGHT = false;
  } else if (event.target.id == "jumpBtnRight" || event.target.id == "jumpBtnLeft") {
    keyboard.SPACE = false;
  } else if (event.target.id == "throwBtnRight" || event.target.id == "throwBtnLeft") {
    keyboard.B = false;
  }
}

document.addEventListener("DOMContentLoaded", listenerForMobile);

/**
 * Adds event listeners for orientation change and resize if the device is mobile.
 */
function listenerForMobile() {
  if (isMobileDevice()) {
    checkOrientation();
    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("resize", checkOrientation);
  }
}

/**
 * Checks if the current device is a mobile device.
 * @returns {boolean} True if the device is mobile, false otherwise.
 */
export function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

/**
 * Toggles the visibility of mobile buttons based on the action provided.
 * @param {string} [action=""] - The action to perform ("show" or "hide").
 */
export function toggleMobileBtns(action = "") {
  const mobileBtnIds = ["leftBtn", "rightBtn", "jumpBtnRight", "jumpBtnLeft", "throwBtnRight", "throwBtnLeft"];
  mobileBtnIds.forEach((btnId) => {
    const btn = document.getElementById(btnId);
    btn.classList.toggle("dNone", action === "hide");
    if (action === "show") btn.classList.remove("dNone");
  });
}

/**
 * Checks the orientation of the device and shows or hides the landscape warning accordingly.
 */
function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    showLandscapeWarning();
  } else {
    hideLandscapeWarning();
  }
}

/**
 * Shows the landscape warning for mobile devices.
 */
function showLandscapeWarning() {
  document.getElementById("mobileTurn").classList.remove("dNone");
  document.getElementById("mainContent").classList.add("dNone");
}

/**
 * Hides the landscape warning for mobile devices.
 */
function hideLandscapeWarning() {
  document.getElementById("mobileTurn").classList.add("dNone");
  document.getElementById("mainContent").classList.remove("dNone");
}
