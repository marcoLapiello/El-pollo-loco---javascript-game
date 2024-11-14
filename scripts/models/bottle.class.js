import { MovableObject } from "./movable-object.class.js";

export class Bottle extends MovableObject {
  height = 50;
  width = 50;
  speedX = 10;
  speedY = 15;
  gravity = 1;
  keyboard;

  constructor(initialX, initialY, keyboard) {
    super();
    this.x = initialX;
    this.y = initialY;

    this.loadImage("Grafics/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");

    this.throw(this.x, this.y);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.applyGravity();
    setInterval(() => {
      this.x += 20;
    }, 25);
  }
}
