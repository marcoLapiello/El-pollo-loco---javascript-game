class MovableObject {
  x = 120;
  y = 300;
  img;
  height = 150;
  width = 100;
  speed = 0.5;
  facingLeft = false;
  imageCache = {};
  currentImageIndex = 0;
  speedY = 0;
  acceleration = 1;

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
    this.x += this.speed;
    this.facingLeft = false;
  }

  moveLeft() {
    this.x -= this.speed;
    this.facingLeft = true;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isJumping() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.y >= 190) {
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
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.x + this.offsetY + this.height >= obj.x &&
      this.x + this.offsetY <= obj.Y + obj.height &&
      obj.onCollisionCourse
    ); // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
  }
}
