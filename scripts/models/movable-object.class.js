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

  moveRight() {
    console.log("Moving right");
  }

  moveLeft(){
    setInterval(() => {
      this.x -= this.speed;
      if (this.x + this.width < 0) {
        this.x = 720;
      }
    }, 1000 / 60);
  }
}
