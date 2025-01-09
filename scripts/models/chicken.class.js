import { MovableObject } from './movable-object.class.js';
import { intervalManager } from '../managers/intervalManager.class.js';

export class Chicken extends MovableObject {
  type = 'chicken';
  x = 720 + Math.random() * 1800;
  y = 370;
  height = 80;
  width = 80;
  offsetX = 2;
  offsetY = 5;
  widthCorrection = 8;
  heightCorrection = 10;

  IMAGES_WALKING = [
    "Grafics/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "Grafics/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "Grafics/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["Grafics/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGE_DEAD);
    this.speedX = 0.5 + Math.random() * 1.5;
    this.animate();
  }

  animate() {
    intervalManager.setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
      }

      if (this.x + this.width < 0) {
        // Lascia il pollo ricominciare da destra
        this.x = 720 + Math.random() * 1800;
      }
    }, 1000 / 60);

    intervalManager.setInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimationOnce(this.IMAGE_DEAD);
      }
    }, 100);
  }
}

