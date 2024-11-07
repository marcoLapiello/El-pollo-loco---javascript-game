class Chicken extends MovableObject {
  y = 353;
  height = 100;
  width = 100;

  constructor() {
    super().loadImage("Grafics/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = 200 + Math.random() * 500;
  }
}
