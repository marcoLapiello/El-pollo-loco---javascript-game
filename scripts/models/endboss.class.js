import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {
    height = 350;
    width = 300;
    y = 125;

  IMAGES_WALKING = [
    "Grafics/img/4_enemie_boss_chicken/2_alert/G5.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G6.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G7.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G8.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G9.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G10.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G11.png",
    "Grafics/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 2000;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
