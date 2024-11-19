class Bottle extends MovableObject {
  offsetX = 15;
  offsetY = 7;
  widthCorrection = 35;
  heightCorrection = 10;

  
  
  constructor(initialX, initialY) {
    super();
    this.loadImage("Grafics/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.x = initialX;
    this.y = initialY;
    this.height = 50;
    this.width = 50;
    this.acceleration = 1;
    this.speedX = 25;
    this.speedY = 17;

    this.throw();
  }

  throw() {
    this.applyGravity();
    setInterval(() => {
      this.x += this.speedX;
    }, 25);
  }
}
