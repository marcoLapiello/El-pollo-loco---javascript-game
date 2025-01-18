import { DrawableObjects } from "./drawable-objects.class.js";
import { Bottle } from "./bottle.class.js";

export class MovableObject extends DrawableObjects {
  facingLeft = false;
  speedX = 0;
  speedY = 0;
  acceleration = 1;
  health = 100;
  lastHit = 0;
  isGamePaused = false;

  playAnimation(imgArray, frameSkip = 1, loop = true) {
    if (!imgArray || imgArray.length === 0) {
      console.error("Array di immagini non valido:", imgArray);
      return false;
    }

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

  isAnimationComplete(imgArray, frameSkip = 1) {
    const totalFrames = imgArray.length * frameSkip;
    const currentFrame = this.currentImageIndex;
    return currentFrame >= totalFrames;
  }

  moveRight() {
    this.x += this.speedX;
  }

  moveLeft() {
    this.x -= this.speedX;
  }

  jump() {
    this.speedY = 20;
  }

  pauseGravity() {
    this.isGamePaused = true;
  }

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

  isInTheAir() {
    if (this instanceof Bottle) {
      return true;
    } else {
      return this.y < 190;
    }
  }

  isOnTheGround() {
    return this.y === 190;
  }

  isColliding(obj) {
    return (
      this.x + this.offsetX + (this.width - this.widthCorrection) > obj.x + obj.offsetX &&
      this.y + this.offsetY + (this.height - this.heightCorrection) > obj.y + obj.offsetY &&
      this.x + this.offsetX < obj.x + obj.offsetX + (obj.width - obj.widthCorrection) &&
      this.y + this.offsetY < obj.y + obj.offsetY + (obj.height - obj.heightCorrection)
    );
  }

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

  getsHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Differenza in ms
    timePassed = timePassed / 1000; // Differenza in s
    return timePassed < 0.7;
  }

  isDead() {
    return this.health === 0;
  }

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
