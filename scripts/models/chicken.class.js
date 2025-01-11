import { MovableObject } from "./movable-object.class.js";
import { intervalManager } from "../managers/intervalManager.class.js";
import { IMAGES_WALKING, IMAGE_DEAD } from "../imgsPaths/chickenImgs.js";

export class Chicken extends MovableObject {
  type = "chicken";
  x = 720 + Math.random() * 1800;
  y = 370;
  height = 80;
  width = 80;
  offsetX = 2;
  offsetY = 5;
  widthCorrection = 8;
  heightCorrection = 10;

  constructor() {
    super().loadImage(IMAGES_WALKING[0]);
    this.loadImages(IMAGES_WALKING);
    this.loadImages(IMAGE_DEAD);
    this.speedX = 0.5 + Math.random() * 1.5;
    // this.registerAnimation();
  }

  registerAnimation() {
    intervalManager.registerAnimation(this, {
      update: () => {
        if (!this.isDead()) {
          this.moveLeft();
          this.playAnimation(IMAGES_WALKING, 5, true);
        } else {
          this.playAnimation(IMAGE_DEAD, 1, false);
          intervalManager.unregisterAnimation(this);
        }
        if (this.x + this.width < 0) {
          this.x = 720 + Math.random() * 1800;
        }
      },
    });
  }
}
