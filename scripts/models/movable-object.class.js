import { DrawableObjects } from './drawable-objects.class.js';
import { Bottle } from './bottle.class.js';


export class MovableObject extends DrawableObjects {
  facingLeft = false;
  speedX = 0;
  speedY = 0;
  acceleration = 1;
  health = 10;
  lastHit = 0;

  playAnimation(imgArray) {
    let index = this.currentImageIndex % imgArray.length;
    let path = imgArray[index];
    this.img = this.imageCache[path];
    this.currentImageIndex++;
  }

  playAnimationOnce(imgArray) {
    let index = this.currentImageIndex % imgArray.length;
    let path = imgArray[index];
    this.img = this.imageCache[path];
    if (index === imgArray.length - 1) {
      this.currentImageIndex = imgArray.length - 1;
    } else {
      this.currentImageIndex++;
    }
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

  applyGravity() {
    const gravityInterval = setInterval(() => {
      if (this.isInTheAir() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.isCharacter && this.y >= 190) {
          this.y = 190;
          this.speedY = 0;
        }
      }
    }, 1000 / 60);

    // Registra l'intervallo in un gestore centrale, se disponibile
    if (typeof intervalManager !== 'undefined') {
      intervalManager.setInterval(gravityInterval);
    }
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
    this.health -= 1;
    if (this.health < 0) {
      this.health = 0;
    } else if (this.type === 'chicken') {
      this.health = 0;
    } else {
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
      !this.world.keyboard.UP &&
      !this.world.keyboard.DOWN &&
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

