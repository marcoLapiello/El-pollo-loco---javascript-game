import { MovableObject } from './movable-object.class.js';
import { intervalManager } from '../managers/intervalManager.class.js';

export class Bottle extends MovableObject {
  offsetX = 15;
  offsetY = 7;
  widthCorrection = 35;
  heightCorrection = 10;
  isBreaking = false;

  ROTATION_IMAGES = [
    "Grafics/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "Grafics/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "Grafics/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "Grafics/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  CRASH_IMAGES = [
    "Grafics/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "Grafics/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "Grafics/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "Grafics/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "Grafics/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "Grafics/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(initialX, initialY) {
    super();
    this.loadImage(this.ROTATION_IMAGES[0]);
    this.loadImages(this.ROTATION_IMAGES);
    this.loadImages(this.CRASH_IMAGES);
    this.x = initialX;
    this.y = initialY;
    this.height = 50;
    this.width = 50;
    this.acceleration = 1.5;
    this.speedX = 25;
    this.speedY = 17;

    this.applyGravity();
    this.registerAnimation();
  }

  registerAnimation() {
    intervalManager.registerAnimation(this, {
      update: () => {
        if (!this.isBreaking) {
          this.x += this.speedX;
          this.playAnimation(this.ROTATION_IMAGES, 3, true);
        } else {
          this.playAnimation(this.CRASH_IMAGES, 1, false);
          if (this.currentImageIndex >= this.CRASH_IMAGES.length - 1) {
            intervalManager.unregisterAnimation(this);
          }
        }
      },
    });
  }
}
