import { MovableObject } from "./movable-object.class.js";
import { intervalManager } from "../managers/intervalManager.class.js";
import { IMAGES_ALERT, IMAGES_WALKING, IMAGES_DEAD, IMAGES_HURT, IMAGES_ATTACKING } from "../imgsPaths/endbossImgs.js";

export class Endboss extends MovableObject {
  height = 350;
  width = 300;
  y = 125;
  offsetX = 40;
  offsetY = 100;
  widthCorrection = 60;
  heightCorrection = 110;
  isWalking = false;
  isAttacking = false;
  counter = 0;
  attackSpeedX = 2;
  startWalkingDistanceX = 720;
  startAttackingDistanceX = 220;

  

  die_sound = new Audio("audio/boss_dies.wav");
  deadSoundOn = false;

  constructor() {
    super().loadImage(IMAGES_ALERT[0]);
    this.loadImages(IMAGES_ALERT);
    this.loadImages(IMAGES_WALKING);
    this.loadImages(IMAGES_DEAD);
    this.loadImages(IMAGES_HURT);
    this.loadImages(IMAGES_ATTACKING);
    this.x = 1500;
    this.speedX = 1;
    this.registerAnimation();
  }

  switchWalkingAttacking(bool1, bool2) {
    this.isWalking = bool1;
    this.isAttacking = bool2;
  }

  registerAnimation() {
    intervalManager.registerAnimation(this, {
      update: () => {
        if (this.isWalking && !this.isDead()) {
          this.moveLeft();
        } else if (this.isAttacking && !this.isDead()) {
          this.x -= this.attackSpeedX;
        }
      },
    });

    intervalManager.registerAnimation(this, {
      update: () => {
        if (this.isDead() && this.counter === 0) {
          this.playAnimation(IMAGES_DEAD, 1, true);
          this.die_sound.play();
          this.counter++;
        } else if (this.getsHurt() && !this.isDead()) {
          this.playAnimation(IMAGES_HURT, 10, false);
        } else if (this.isAttacking && !this.isDead()) {
          this.playAnimation(IMAGES_ATTACKING, 10, true);
        } else if (this.isWalking && !this.isAttacking && !this.isDead()) {
          this.playAnimation(IMAGES_WALKING, 10, true);
        } else if (!this.isWalking && !this.isAttacking && !this.isDead()) {
          this.playAnimation(IMAGES_ALERT, 3, true);
        }
      },
    });
  }
}
