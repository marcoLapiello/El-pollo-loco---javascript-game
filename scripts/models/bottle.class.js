import { MovableObject } from "./movable-object.class.js";
import { intervalManager } from "../managers/intervalManager.class.js";
import { ROTATION_IMAGES, CRASH_IMAGES } from "../imgsPaths/bottleImgs.js";

export class Bottle extends MovableObject {
  offsetX = 15;
  offsetY = 7;
  widthCorrection = 35;
  heightCorrection = 10;
  isBreaking = false;

  constructor(initialX, initialY) {
    super();
    this.loadImage(ROTATION_IMAGES[0]);
    this.loadImages(ROTATION_IMAGES);
    this.loadImages(CRASH_IMAGES);
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
          this.playAnimation(ROTATION_IMAGES, 3, true);
        } else {
          this.playAnimation(CRASH_IMAGES, 1, false);
          console.log("Indice immagine rottura:", this.currentImageIndex);
          if (this.currentImageIndex >= CRASH_IMAGES.length - 1) {
            console.log("Animazione completa. Rimuovendo bottiglia.");
            intervalManager.unregisterAnimation(this);
            // const index = this.world.bottles.indexOf(this);
            // if (index > -1) {
            //   this.world.bottles.splice(index, 1);
            // }
          }
        }
      },
    });
  }
}
