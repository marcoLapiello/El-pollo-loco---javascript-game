import { MovableObject } from "./movable-object.class.js";
import { intervalManager } from "../managers/intervalManager.class.js";
import { ROTATION_IMAGES, CRASH_IMAGES } from "../imgsPaths/bottleImgs.js";
import { soundManager } from "../game.js";

/**
 * Represents a bottle in the game.
 * @extends MovableObject
 */
export class Bottle extends MovableObject {
  offsetX = 15;
  offsetY = 7;
  widthCorrection = 35;
  heightCorrection = 10;
  isBreaking = false;
  isSoundMute;

  /**
   * Creates an instance of Bottle.
   * @param {number} initialX - The initial x-coordinate of the bottle.
   * @param {number} initialY - The initial y-coordinate of the bottle.
   * @param {boolean} isSoundMute - Whether the sound is muted.
   * @param {boolean} facingLeft - Whether the bottle is facing left.
   */
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
    this.speedX = 18;
    this.speedY = 20;
    soundManager.registerSound("bottleBreaks", new Audio("./audio/glass-shatter-sound.wav"));
    this.applyGravity();
    this.registerAnimation();
  }

  /**
   * Registers the bottle animation.
   */
  registerAnimation() {
    intervalManager.registerAnimation(this, {
      update: this.updateBottleState.bind(this),
    });
  }

  /**
   * Updates the bottle state based on its current condition.
   */
  updateBottleState() {
    if (this.isBreaking) {
      this.handleBreakingState();
    } else {
      this.handleMovingState();
    }
  }

  /**
   * Handles the bottle's breaking state.
   */
  handleBreakingState() {
    this.playAnimation(CRASH_IMAGES, 1, false);
    if (!this.isSoundMute) {
      soundManager.playSound("bottleBreaks");
    }
    if (this.currentImageIndex >= CRASH_IMAGES.length - 1) {
      intervalManager.unregisterAnimation(this);
    }
  }

  /**
   * Handles the bottle's moving state.
   */
  handleMovingState() {
    this.x += this.facingLeft ? -this.speedX : this.speedX;
    this.playAnimation(ROTATION_IMAGES, 3, true);
  }
}
