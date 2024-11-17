class Coins extends DrawableObjects {
  offsetX = 33;
  offsetY = 33;
  widthCorrection = 65;
  heightCorrection = 65;

  IMAGES = ["Grafics/img/8_coin/coin_2.png"];

  constructor(x, y) {
    super().loadImage(this.IMAGES[0]);
    // this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
  }
}
