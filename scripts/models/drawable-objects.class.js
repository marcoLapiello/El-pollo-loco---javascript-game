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

  // Carica una singola immagine
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  // Carica un array di immagini nella cache
  loadImages(imgArray) {
    imgArray.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  // Restituisce l'immagine corrente dalla cache
  getCurrentImage() {
    return this.imageCache[Object.keys(this.imageCache)[this.currentImageIndex]];
  }

  // Avanza al prossimo frame nell'array di immagini
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % Object.keys(this.imageCache).length;
    this.img = this.getCurrentImage();
  }

  // Reset dell'indice immagine
  resetImageIndex() {
    this.currentImageIndex = 0;
    this.img = this.getCurrentImage();
  }
}

