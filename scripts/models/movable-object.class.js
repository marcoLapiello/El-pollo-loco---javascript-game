class MovableObject {
  x = 120;
  y = 300;
  img;
  height = 150;
  width = 100;
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

  moveLeft() {}
}
