/**
 * Represents drawable objects in the game.
 */
export class DrawableObjects {
  x = 120;
  y = 300;
  height = 150;
  width = 100;
  offsetX = 0;
  offsetY = 0;
  widthCorrection = 0;
  heightCorrection = 0;
  img;
  imageCache = {};
  currentImageIndex = 0;

  /**
   * Loads a single image.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads an array of images into the cache.
   * @param {Array<string>} imgArray - The array of image paths.
   */
  loadImages(imgArray) {
    imgArray.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}

