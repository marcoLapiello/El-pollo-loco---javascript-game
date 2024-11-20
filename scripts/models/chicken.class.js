class Chicken extends MovableObject {
  x = 720;
  y = 370;
  height = 80;
  width = 80;
  offsetX = 2;
  offsetY = 5;
  widthCorrection = 8;
  heightCorrection = 10;
  IMAGES_WALKING = [
    "Grafics/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "Grafics/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "Grafics/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.speedX = 0.3 + Math.random() * 0.7;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      if (this.x + this.width < 0) {
        // This let the chicken start again from right
        // after they disappear at the left side of the screen
        this.x = 720;
      }
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
