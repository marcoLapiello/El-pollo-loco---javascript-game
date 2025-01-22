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

  /**
   * Returns the current image from the cache.
   * @returns {HTMLImageElement} The current image.
   */
  getCurrentImage() {
    return this.imageCache[Object.keys(this.imageCache)[this.currentImageIndex]];
  }

  /**
   * Advances to the next frame in the image array.
   */
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % Object.keys(this.imageCache).length;
    this.img = this.getCurrentImage();
  }

  /**
   * Resets the image index.
   */
  resetImageIndex() {
    this.currentImageIndex = 0;
    this.img = this.getCurrentImage();
  }
}

