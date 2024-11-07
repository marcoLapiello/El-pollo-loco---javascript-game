class Clouds extends MovableObject {
  width = 500;
  height = 300;

  constructor() {
    super().loadImage("Grafics/img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 720;
    this.y = 20;
  }

  cloudsConstantMove(){
    this.x -= 0.5;
    if (this.x + this.width < 0) {
      this.x = 720;
    }
  }
}
