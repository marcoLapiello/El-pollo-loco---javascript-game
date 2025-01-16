import { MovableObject } from "./movable-object.class.js";
import { intervalManager } from "../managers/intervalManager.class.js";
import { IMAGES_IDLE, IMAGES_SLEEP, IMAGES_WALKING, IMAGES_JUMPING, IMAGES_DEAD, IMAGES_HURT } from "../imgsPaths/characterImgs.js";
import { soundManager } from "../game.js";

export class Character extends MovableObject {
  y = 190;
  height = 270;
  width = 135;
  offsetX = 20;
  offsetY = 100;
  widthCorrection = 60;
  heightCorrection = 110;
  isCharacter = true;
  world;
  // isSoundMute;
  speedX = 3;
  jumpDuration = 670; // in ms

  constructor() {
    super().loadImage(IMAGES_IDLE[0]);
    this.loadImages(IMAGES_IDLE);
    this.loadImages(IMAGES_SLEEP);
    this.loadImages(IMAGES_WALKING);
    this.loadImages(IMAGES_JUMPING);
    this.loadImages(IMAGES_DEAD);
    this.loadImages(IMAGES_HURT);
    this.applyGravity();
    
    
    
  }

  registerAnimation() {
    intervalManager.registerAnimation(this, {
      update: () => {
        soundManager.pauseSound("walk");
        if (this.world.keyboard.RIGHT && this.x < this.world.level.LEVEL_END_X && !this.isDead()) {
          this.moveRight();
          this.facingLeft = false;
          if (!this.isInTheAir()) {
            soundManager.playSound("walk");
          }
        }
        if (this.world.keyboard.LEFT && this.x > -100 && !this.isDead()) {
          this.moveLeft();
          this.facingLeft = true;
          if (!this.isInTheAir()) {
            soundManager.playSound("walk");
          }
        }
        if (this.world.keyboard.SPACE && this.isOnTheGround() && !this.isDead()) {
          this.jump();
          soundManager.playSound("jump");
        }
        this.world.camera_x = -this.x + 100;
      },
    });

    intervalManager.registerAnimation(this, {
      update: () => {
        if (this.isDead()) {
          this.playAnimation(IMAGES_DEAD, 1, false);
          soundManager.playSound("dies");
          intervalManager.unregisterAnimation(this);
        } else if (this.getsHurt() && !this.isDead()) {
          this.playAnimation(IMAGES_HURT, 3, true);
          soundManager.playSound("hurt");
        } else if (!this.isDead() && this.isInTheAir()) {
          this.playAnimation(IMAGES_JUMPING, 6, true);
        } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isDead() && !this.isInTheAir()) {
          this.playAnimation(IMAGES_WALKING, 6, true);
        } else if (!this.isDead() && this.isNotMoving()) {
          this.playAnimation(IMAGES_IDLE, 10, true);
        }
      },
    });
  }
}
