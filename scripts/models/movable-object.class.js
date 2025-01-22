import { DrawableObjects } from "./drawable-objects.class.js";
import { Bottle } from "./bottle.class.js";

/**
 * Represents a movable object in the game.
 * @extends DrawableObjects
 */
export class MovableObject extends DrawableObjects {
  facingLeft = false;
  speedX = 0;
  speedY = 0;
  acceleration = 1;
  health = 100;
  lastHit = 0;
  isGamePaused = false;

  /**
   * Plays an animation from the given image array.
   * @param {Array<string>} imgArray - The array of image paths.
   * @param {number} [frameSkip=1] - The number of frames to skip between each image change.
   * @param {boolean} [loop=true] - Whether the animation should loop.
   * @returns {boolean} Whether the animation is complete.
   */
  playAnimation(imgArray, frameSkip = 1, loop = true) {
    let animationComplete = false;
    if (this.currentImageIndex % frameSkip === 0) {
      let index = Math.floor(this.currentImageIndex / frameSkip);
      if (loop) {
        index = index % imgArray.length;
      } else if (index >= imgArray.length) {
        index = imgArray.length - 1;
        animationComplete = true;
      }
      this.img = this.imageCache[imgArray[index]];
    }
    if (loop || this.currentImageIndex / frameSkip < imgArray.length) {
      this.currentImageIndex++;
    }
    return animationComplete;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speedX;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speedX;
  }

  /**
   * Makes the object jump.
   */
  jump() {
    this.speedY = 20;
  }

  /**
   * Pauses the gravity effect on the object.
   */
  pauseGravity() {
    this.isGamePaused = true;
  }

  /**
   * Applies gravity to the object.
   */
  applyGravity() {
    const gravityInterval = setInterval(() => {
      if (!this.isGamePaused && (this.isInTheAir() || this.speedY > 0)) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.isCharacter && this.y >= 190) {
          this.y = 190;
          this.speedY = 0;
        }
      }
    }, 1000 / 60);
  }

  isSleeping() {
    
  }

  /**
   * Checks if the object is in the air.
   * @returns {boolean} Whether the object is in the air.
   */
  isInTheAir() {
    if (this instanceof Bottle) {
      return true;
    } else {
      return this.y < 190;
    }
  }

  /**
   * Checks if the object is on the ground.
   * @returns {boolean} Whether the object is on the ground.
   */
  isOnTheGround() {
    return this.y === 190;
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {DrawableObjects} obj - The other object.
   * @returns {boolean} Whether the object is colliding with the other object.
   */
  isColliding(obj) {
    return (
      this.x + this.offsetX + (this.width - this.widthCorrection) > obj.x + obj.offsetX &&
      this.y + this.offsetY + (this.height - this.heightCorrection) > obj.y + obj.offsetY &&
      this.x + this.offsetX < obj.x + obj.offsetX + (obj.width - obj.widthCorrection) &&
      this.y + this.offsetY < obj.y + obj.offsetY + (obj.height - obj.heightCorrection)
    );
  }

  /**
   * Handles the object getting hit.
   */
  getsHit() {
    if (this.health < 0) {
      this.health = 0;
    }
    if (this.isCharacter) {
      this.health -= 1;
      this.lastHit = new Date().getTime();
    } else if (this.type === "chicken" || this.type === "chick") {
      this.health = 0;
    } else if (this.type === "endboss") {
      this.health -= 0.25;
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is hurt.
   * @returns {boolean} Whether the object is hurt.
   */
  getsHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Differenza in ms
    timePassed = timePassed / 1000; // Differenza in s
    return timePassed < 0.7;
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} Whether the object is dead.
   */
  isDead() {
    return this.health === 0;
  }

  /**
   * Checks if the object is not moving.
   * @returns {boolean} Whether the object is not moving.
   */
  isNotMoving() {
    if (
      !this.world.keyboard.LEFT &&
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.SPACE &&
      !this.world.keyboard.B &&
      !this.isDead() &&
      !this.getsHurt() &&
      !this.isInTheAir()
    ) {
      return true;
    }
  }
}
