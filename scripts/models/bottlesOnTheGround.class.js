class BottlesOnTheGround extends DrawableObjects {
  offsetX = 20;
  offsetY = 7;
  widthCorrection = 30;
  heightCorrection = 10;

  IMAGES = ["Grafics/img/6_salsa_bottle/1_salsa_bottle_on_ground.png", "Grafics/img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  constructor(x, y) {
    super().loadImage(this.IMAGES[Math.floor(Math.random() * this.IMAGES.length)]);
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
  }
}
