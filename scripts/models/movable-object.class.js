class MovableObject extends DrawableObjects {
  
  speedX = 0.5;
  facingLeft = false;
  imageCache = {};
  currentImageIndex = 0;
  speedY = 0;
  acceleration = 1;
  health = 100;
  lastHit = 0;

  playAnimation(imgArray) {
    let index = this.currentImageIndex % imgArray.length;
    let path = imgArray[index];
    this.img = this.imageCache[path];
    this.currentImageIndex++;
  }

  moveRight() {
    this.x += this.speedX;
    this.facingLeft = false;
  }

  moveLeft() {
    this.x -= this.speedX;
    this.facingLeft = true;
  }

  jump() {
    this.speedY = 20;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isJumping() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this instanceof Character && this.y >= 190) {
          this.y = 190;
          this.speedY = 0;
        }
      }
    }, 1000 / 60);
  }

  isJumping() {
    return this.y < 190;
  }

  isOnTheGround() {
    return this.y === 190;
  }

  isColliding(obj) {
    return this.x + this.width > obj.x && this.y + this.height > obj.y && this.x < obj.x + obj.width && this.y < obj.y + obj.height;
  }

  getsHit() {
    this.health -= 5;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  getsHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    return timePassed < 0.7;
  }

  isDead() {
    return this.health == 0;
  }
}
