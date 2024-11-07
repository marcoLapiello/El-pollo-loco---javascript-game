class Clouds extends MovableObject {
  y = 20;
  width = 500;
  height = 300;
  speed = 0.2;

  constructor() {
    super().loadImage("Grafics/img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 720;
    this.cloudsConstantMove();
  }

  cloudsConstantMove() {
    this.moveLeft();
  }
}
