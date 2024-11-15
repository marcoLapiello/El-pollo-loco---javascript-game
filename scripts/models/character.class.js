import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
  y = 190;
  height = 270;
  width = 135;
  IMAGES_WALKING = [
    "Grafics/img/2_character_pepe/2_walk/W-21.png",
    "Grafics/img/2_character_pepe/2_walk/W-22.png",
    "Grafics/img/2_character_pepe/2_walk/W-23.png",
    "Grafics/img/2_character_pepe/2_walk/W-24.png",
    "Grafics/img/2_character_pepe/2_walk/W-25.png",
    "Grafics/img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "Grafics/img/2_character_pepe/3_jump/J-31.png",
    "Grafics/img/2_character_pepe/3_jump/J-32.png",
    "Grafics/img/2_character_pepe/3_jump/J-33.png",
    "Grafics/img/2_character_pepe/3_jump/J-34.png",
    "Grafics/img/2_character_pepe/3_jump/J-35.png",
    "Grafics/img/2_character_pepe/3_jump/J-36.png",
    "Grafics/img/2_character_pepe/3_jump/J-37.png",
    "Grafics/img/2_character_pepe/3_jump/J-38.png",
    "Grafics/img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DEAD = [
    "Grafics/img/2_character_pepe/5_dead/D-51.png",
    "Grafics/img/2_character_pepe/5_dead/D-52.png",
    "Grafics/img/2_character_pepe/5_dead/D-53.png",
    "Grafics/img/2_character_pepe/5_dead/D-54.png",
    "Grafics/img/2_character_pepe/5_dead/D-55.png",
    "Grafics/img/2_character_pepe/5_dead/D-56.png",
    "Grafics/img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = [
    "Grafics/img/2_character_pepe/4_hurt/H-41.png",
    "Grafics/img/2_character_pepe/4_hurt/H-42.png",
    "Grafics/img/2_character_pepe/4_hurt/H-43.png",
  ];
  keyboard;
  world;
  speedX = 3;
  jumpDuration = 670; // in ms
  walking_sound = new Audio("audio/running.wav");

  constructor(world) {
    super().loadImage("Grafics/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.world = world;
    this.applyGravity();
    this.walk();
    this.jump();
  }

  walk() {
    setInterval(() => {
      this.walking_sound.pause();

      if (this.keyboard.RIGHT && this.x < this.world.level.LEVEL_END_X) {
        this.moveRight();
        this.walking_sound.play();
      } else if (this.keyboard.LEFT && this.x > -100) {
        this.moveLeft();
        this.walking_sound.play();
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.getsHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        if ((this.isOnTheGround() && this.keyboard.RIGHT) || (this.isOnTheGround() && this.keyboard.LEFT)) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 100);
  }

  jump() {
    setInterval(() => {
      if (this.keyboard.UP && this.isOnTheGround()) {
        this.speedY = 20;
        this.playJumpAnimation();
      }
    }, 1000 / 60);
  }

  playJumpAnimation() {
    const interval = this.jumpDuration / this.IMAGES_JUMPING.length; // Calcola l'intervallo per ogni frame
    let currentFrame = 0;

    const jumpAnimation = setInterval(() => {
      if (currentFrame < this.IMAGES_JUMPING.length) {
        this.img = this.imageCache[this.IMAGES_JUMPING[currentFrame]];
        currentFrame++;
      } else {
        clearInterval(jumpAnimation);
      }
    }, interval);
  }
}
