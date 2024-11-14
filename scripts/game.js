import { World } from "./models/world.class.js";
window.World = World;

import { Keyboard } from "./models/keyboard.class.js";
window.Keyboard = Keyboard;

import { MovableObject } from "./models/movable-object.class.js";
window.MovableObject = MovableObject;

import { StatusBars } from "./models/statusBars.class.js";
window.StatusBars = StatusBars;

import { Background } from "./models/background.class.js";
window.Background = Background;

import { Clouds } from "./models/cloud.class.js";
window.Clouds = Clouds;

import { Character } from "./models/character.class.js";
window.Character = Character;

import { Chicken } from "./models/chicken.class.js";
window.Chicken = Chicken;

import { Endboss } from "./models/endboss.class.js";
window.Endboss = Endboss;

import { Level } from "./models/level.class.js";
window.Level = Level;

import { level1 } from "./levels/level1.js";
window.level1 = level1;

export { World, Keyboard, StatusBars, MovableObject, Background, Clouds, Character, Chicken, Endboss, level1 }

let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}
window.init = init;

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
