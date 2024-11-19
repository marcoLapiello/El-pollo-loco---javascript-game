class Endboss extends MovableObject {
  height = 350;
  width = 300;
  y = 125;
  offsetX = 40;
  offsetY = 100;
  widthCorrection = 60;
  heightCorrection = 110;
  isWalking = false;

  IMAGES_ALERT = [
    "Grafics/img/4_enemie_boss_chicken/2_alert/G5.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G6.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G7.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G8.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G9.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G10.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G11.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_WALKING = [
    "Grafics/img/4_enemie_boss_chicken/1_walk/G1.png",
    "Grafics/img/4_enemie_boss_chicken/1_walk/G2.png",
    "Grafics/img/4_enemie_boss_chicken/1_walk/G3.png",
    "Grafics/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2000;
    this.speed = 0.3 + Math.random() * 0.7;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isWalking) {
        this.x -= this.speed;
      }
      
      
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isWalking) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.isWalking) {
        this.playAnimation(this.IMAGES_WALKING);
      }
      
    }, 100);
  }
}
