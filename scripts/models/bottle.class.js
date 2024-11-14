import { MovableObject } from "./movable-object.class.js";

export class Bottle extends MovableObject {
  height = 50;
  width = 50;
  speedX = 10;
  speedY = 15;
  gravity = 1;
  keyboard;

  constructor(initialX, initialY) {
    super();
    this.x = initialX;
    this.y = initialY;

    this.loadImage("Grafics/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.throw();
  }

  throw() {
    setInterval(() => {
      if (this.keyboard.B) {
        console.log("B was pressed");
        
        this.x += this.speedX;
        this.y -= this.speedY;
        this.speedY -= this.gravity;
      }
    }, 1000 / 60);
  }
}
