import { MovableObject } from "./movable-object.class.js";
import { intervalManager } from "../managers/intervalManager.class.js";
import { IMAGES_WALKING, IMAGE_DEAD } from "../imgsPaths/chickenImgs.js";
import { soundManager } from "../game.js";

/**
 * Represents a chicken in the game.
 * @extends MovableObject
 */
export class Chicken extends MovableObject {
  type = "chicken";
  y = 370;
  height = 80;
  width = 80;
  offsetX = 2;
  offsetY = 5;
  widthCorrection = 8;
  heightCorrection = 10;

  /**
   * Creates an instance of Chicken.
   */
  constructor() {
    super().loadImage(IMAGES_WALKING[0]);
    this.loadImages(IMAGES_WALKING);
    this.loadImages(IMAGE_DEAD);
    this.speedX = 0.5 + Math.random() * 5;
    this.x = 720 + Math.random() * 4800;
  }

  /**
   * Registers the chicken animation.
   */
  registerAnimation() {
    intervalManager.registerAnimation(this, {
      update: () => {
        if (!this.isDead()) {
          this.moveLeft();
          this.playAnimation(IMAGES_WALKING, 5, true);
        } else {
          this.playAnimation(IMAGE_DEAD, 1, false);
          soundManager.playSound("chickenDies");
          intervalManager.unregisterAnimation(this);
        }
        if (this.x + this.width < 0) {
          this.x = 720 + Math.random() * 4800;
        }
      },
    });
  }
}
