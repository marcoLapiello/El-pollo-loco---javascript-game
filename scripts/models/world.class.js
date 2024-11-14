import { StatusBars } from "../game.js";
import { Character } from "../game.js";
import { Bottle } from "./bottle.class.js";

export class World {
  character;
  bottle;
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character = new Character(this);
    this.character.keyboard = this.keyboard;
    this.bottle = new Bottle(this.character.x, this.character.y);
    this.bottle.keyboard = this.keyboard;
    this.healthBar = new StatusBars(this.ctx, this.character.health);

    this.draw();
    this.checkCollision();
  }

  checkCollision() {
    
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.getsHit();
          this.healthBar.update(this.character.health);
          // console.log(this.character.health);
          
        }
      })
    }, 200);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.background);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addToMap(this.bottle);

    this.ctx.translate(-this.camera_x, 0);

    this.healthBar.drawHealthBar();

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addObjectToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(movableObject) {
    this.ctx.save(); // Salva lo stato corrente del contesto

    if (movableObject instanceof Character || movableObject instanceof Chicken || movableObject instanceof Endboss) {
      this.ctx.beginPath();
      this.ctx.rect(movableObject.x, movableObject.y, movableObject.width, movableObject.height);
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }

    if (movableObject.facingLeft) {
      this.ctx.translate(movableObject.x + movableObject.width, 0); // Trasla il contesto verso destra dell'immagine
      this.ctx.scale(-1, 1); // Riflette l'immagine lungo l'asse x
      this.ctx.drawImage(movableObject.img, 0, movableObject.y, movableObject.width, movableObject.height);
    } else {
      this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
    }

    this.ctx.restore(); // Ripristina lo stato del contesto originale
  }
}
