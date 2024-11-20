class Chicken extends MovableObject {
  // Proprietà statica per memorizzare il riferimento al character
  world;

  x = 720 + Math.random() * 1800;
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
    // this.x = generateX();
    this.speedX = 0.5 + Math.random() * 1.5;
    this.animate();
    // this.generateX();
    
  }

  // generateX() {
  //   if (this.world) {
  //     this.x = this.world.character.x + 720 + Math.random() * 500;
  //     console.log("World assegnato correttamente:", this.world);
  //   } else {
  //     console.warn("World non assegnato correttamente");
  //   }
  //   console.log(this.world.character.x);
   
  // }

  animate() {
    setInterval(() => {
      this.moveLeft();
      if (this.x + this.width < 0) {
        // This let the chicken start again from right
        // after they disappear at the left side of the screen
        // this.x = 720;
      }
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
