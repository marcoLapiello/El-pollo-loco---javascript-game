import { MovableObject } from "./movable-object.class.js";
import { intervalManager } from "../managers/intervalManager.class.js";
import { IMAGES_IDLE, IMAGES_SLEEP, IMAGES_WALKING, IMAGES_JUMPING, IMAGES_DEAD, IMAGES_HURT } from "../imgsPaths/characterImgs.js";

export class Character extends MovableObject {
  y = 190;
  height = 270;
  width = 135;
  offsetX = 20;
  offsetY = 100;
  widthCorrection = 60;
  heightCorrection = 110;
  counter = 0;
  isCharacter = true;
  world;
  speedX = 3;
  jumpDuration = 670; // in ms
  walking_sound = new Audio("audio/running.wav");
  jumping_sound = new Audio("audio/breath_jump.wav");

  constructor() {
    super().loadImage(IMAGES_IDLE[0]);
    this.loadImages(IMAGES_IDLE);
    this.loadImages(IMAGES_SLEEP);
    this.loadImages(IMAGES_WALKING);
    this.loadImages(IMAGES_JUMPING);
    this.loadImages(IMAGES_DEAD);
    this.loadImages(IMAGES_HURT);
    this.applyGravity();
    this.registerAnimation();
  }

  registerAnimation() {
    intervalManager.registerAnimation(this, {
      update: () => {
        this.walking_sound.pause();

        if (this.world.keyboard.RIGHT && this.x < this.world.level.LEVEL_END_X) {
          this.moveRight();
          this.facingLeft = false;
          this.walking_sound.play();
        }

        if (this.world.keyboard.LEFT && this.x > -100) {
          this.moveLeft();
          this.facingLeft = true;
          this.walking_sound.play();
        }

        if (this.world.keyboard.SPACE && this.isOnTheGround()) {
          this.jump();
          this.jumping_sound.play();
        }

        this.world.camera_x = -this.x + 100;
      },
    });

    intervalManager.registerAnimation(this, {
      update: () => {
        if (this.isDead() && this.counter === 0) {
          this.playAnimation(IMAGES_DEAD, 2, false);
          this.counter++;
        } else if (this.getsHurt() && !this.isDead()) {
          this.playAnimation(IMAGES_HURT, 3, true);
        } else if (!this.isDead() && this.isInTheAir()) {
          this.playAnimation(IMAGES_JUMPING, 6, true);
        } else if (
          (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) &&
          !this.isDead() &&
          !this.isInTheAir()
        ) {
          this.playAnimation(IMAGES_WALKING, 6, true);
        } else if (!this.isDead() && this.isNotMoving()) {
          this.playAnimation(IMAGES_IDLE, 10, true);
        } 
      },
    });
  }
}
