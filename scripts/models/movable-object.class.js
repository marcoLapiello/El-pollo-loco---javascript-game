class MovableObject {
  x = 120;
  y = 300;
  img;
  height = 150;
  width = 100;
  speedX = 0.5;
  facingLeft = false;
  imageCache = {};
  currentImageIndex = 0;
  speedY = 0;
  acceleration = 1;
  health = 100;
  lastHit = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(imgArray) {
    imgArray.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

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

  applyGravity() {
    setInterval(() => {
      if (this.isInTheAir() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this instanceof Character && this.y >= 190) {
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
    return timePassed < 1;
  }

  isDead() {
    return this.health == 0;
  }
}
