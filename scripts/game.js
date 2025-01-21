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
  window.addEventListener("touchstart", touchInputsTrue);
  window.addEventListener("touchend", touchInputsFalse);
  document.getElementById("startButton").addEventListener("click", startGame);
  // document.getElementById("fullscreenBtn").addEventListener("click", fullScreen);
  document.getElementById("resetButton").addEventListener("click", () => {
    location.reload();
  });
}

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

function loadMenu() {
  if (!imprintOpen) {
    document.getElementById("menuImprintBtn").innerText = "";
    document.getElementById("menuImprintBtn").innerText = "Imprint";
    document.getElementById("gameDescription").innerHTML = "";
    document.getElementById("controls").innerHTML = "";
    document.getElementById("gameDescription").innerHTML = getDescriptionTemplate();
    if (isMobileDevice()) {
      document.getElementById("controls").classList.add("dNone");
    }
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
  if (isMobileDevice()) {
    toggleMobileBtns("show");
  }
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

// MOBILE DEVICE DETECTION

document.addEventListener("DOMContentLoaded", function () {
  // console.log("DOM fully loaded and parsed");
  if (isMobileDevice()) {
    // console.log("Mobile device detected");
    checkOrientation();
    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("resize", checkOrientation);
    
  } else {
    // console.log("Not a mobile device");
  }
});

export function isMobileDevice() {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  // console.log("isMobileDevice:", isMobile);
  return isMobile;
}

export function toggleMobileBtns(action = "") {
  let mobileBtnIds = ["leftBtn", "rightBtn", "jumpBtnRight", "jumpBtnLeft", "throwBtnRight", "throwBtnLeft"];
  mobileBtnIds.forEach((btnId) => {
    let btn = document.getElementById(btnId);
    if (action == "hide") {
      btn.classList.add("dNone");
    } else if (action == "show") {
      btn.classList.remove("dNone");
    }
  });
}

function checkOrientation() {
  // console.log("Checking orientation");
  if (window.innerHeight > window.innerWidth) {
    // console.log("Portrait mode detected");
    showLandscapeWarning();
  } else {
    // console.log("Landscape mode detected");
    hideLandscapeWarning();
  }
}

function showLandscapeWarning() {
  const advice = document.getElementById("mobileTurn");
  const gameContent = document.getElementById("mainContent");
  advice.classList.remove("dNone");
  gameContent.classList.add("dNone");
}

function hideLandscapeWarning() {
  const advice = document.getElementById("mobileTurn");
  const gameContent = document.getElementById("mainContent");
  advice.classList.add("dNone");
  gameContent.classList.remove("dNone");
}
