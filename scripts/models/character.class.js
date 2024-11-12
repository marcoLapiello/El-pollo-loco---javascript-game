class Character extends MovableObject {
  y = 190;
  // y = 0;
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
  keyboard;
  speed = 3;
  walking_sound = new Audio("audio/running.wav");

  constructor() {
    super().loadImage("Grafics/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    this.walk();
    this.jump();
  }

  walk() {
    setInterval(() => {
      this.walking_sound.pause();

      if (this.keyboard.RIGHT && this.x < world.level.LEVEL_END_X) {
        this.moveRight();
        this.walking_sound.play();
      } else if (this.keyboard.LEFT && this.x > -100) {
        this.moveLeft();
        this.walking_sound.play();
      }
      world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isJumping()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.keyboard.RIGHT || this.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 100);
  }

  jump() {
    setInterval(() => {
      if (this.keyboard.UP && this.isOnTheGround()) {
        this.speedY = 20;
      }
    }, 1000 / 60);
  }
}
