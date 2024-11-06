class Clouds extends MovableObject {
  width = 500;
  height = 300;

  constructor() {
    super().loadImage("Grafics/img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 500;
    this.y = 20;
  }
}
