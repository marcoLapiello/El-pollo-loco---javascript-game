import { MovableObject } from "./movable-object.class.js";
import { intervalManager } from "../managers/intervalManager.class.js";
import { ROTATION_IMAGES, CRASH_IMAGES } from "../imgsPaths/bottleImgs.js";
import { soundManager } from "../game.js";

export class Bottle extends MovableObject {
  offsetX = 15;
  offsetY = 7;
  widthCorrection = 35;
  heightCorrection = 10;
  isBreaking = false;
  isSoundMute;

  constructor(initialX, initialY, isSoundMute, facingLeft) {
    super();
    this.loadImage(ROTATION_IMAGES[0]);
    this.loadImages(ROTATION_IMAGES);
    this.loadImages(CRASH_IMAGES);
    this.x = initialX;
    this.y = initialY;
    this.isSoundMute = isSoundMute;
    this.facingLeft = facingLeft;
    this.height = 50;
    this.width = 50;
    this.acceleration = 1.5;
    this.speedX = 25;
    this.speedY = 17;
    soundManager.registerSound("bottleBreaks", new Audio("./audio/glass-shatter-sound.wav"));
    this.applyGravity();
    this.registerAnimation();
  }

  registerAnimation() {
    intervalManager.registerAnimation(this, {
      update: () => {
        if (this.isBreaking) {
          this.playAnimation(CRASH_IMAGES, 1, false);
          if (!this.isSoundMute) {
            soundManager.playSound("bottleBreaks");
          }

          if (this.currentImageIndex >= CRASH_IMAGES.length - 1) {
            intervalManager.unregisterAnimation(this);
          }
        } else {
          if (this.facingLeft) {
            this.x -= this.speedX;
          } else {
            this.x += this.speedX;
          }
          this.playAnimation(ROTATION_IMAGES, 3, true);
        }
      },
    });
  }
}
