import { MovableObject } from "./movable-object.class.js";
import { intervalManager } from "../managers/intervalManager.class.js";
import { IMAGES_ALERT, IMAGES_WALKING, IMAGES_DEAD, IMAGES_HURT, IMAGES_ATTACKING } from "../imgsPaths/endbossImgs.js";
import { soundManager } from "../game.js";

export class Endboss extends MovableObject {
  type = "endboss";
  height = 350;
  width = 300;
  y = 125;
  offsetX = 40;
  offsetY = 100;
  widthCorrection = 60;
  heightCorrection = 110;
  isWalking = false;
  isAttacking = false;
  attackSpeedX = 2;
  startWalkingDistanceX = 720;
  startAttackingDistanceX = 220;

  constructor() {
    super().loadImage(IMAGES_ALERT[0]);
    this.loadImages(IMAGES_ALERT);
    this.loadImages(IMAGES_WALKING);
    this.loadImages(IMAGES_DEAD);
    this.loadImages(IMAGES_HURT);
    this.loadImages(IMAGES_ATTACKING);
    this.x = 3000;
    this.health = 100;
    this.speedX = 2;
  }

  switchWalkingAttacking(bool1, bool2) {
    this.isWalking = bool1;
    this.isAttacking = bool2;
  }

  registerAnimation() {
    intervalManager.registerAnimation(this, {
      update: () => {
        if (this.isDead()) {
          this.playAnimation(IMAGES_DEAD, 1, false);
          soundManager.playSound("bossDies");
          intervalManager.unregisterAnimation(this);
        } else if (this.getsHurt() && !this.isDead()) {
          this.moveLeft();
          this.playAnimation(IMAGES_HURT, 8, true);
        } else if (this.isAttacking && !this.isDead() && !this.getsHurt()) {
          this.x -= this.attackSpeedX;
          this.playAnimation(IMAGES_ATTACKING, 10, true);
          soundManager.playSound("bossAttacks");
        } else if (this.isWalking && !this.isAttacking && !this.isDead() && !this.getsHurt()) {
          this.moveLeft();
          this.playAnimation(IMAGES_WALKING, 10, true);
        } else if (!this.isWalking && !this.isAttacking && !this.isDead() && !this.getsHurt()) {
          this.playAnimation(IMAGES_ALERT, 3, true);
        }
      },
    });
  }
}
