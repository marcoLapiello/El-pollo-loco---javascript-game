class Character extends MovableObject {
  y = 190;
  height = 270;
  width = 135;
  IMAGES_IDLE = [
    "Grafics/img/2_character_pepe/1_idle/idle/I-1.png",
    "Grafics/img/2_character_pepe/1_idle/idle/I-2.png",
    "Grafics/img/2_character_pepe/1_idle/idle/I-3.png",
    "Grafics/img/2_character_pepe/1_idle/idle/I-4.png",
    "Grafics/img/2_character_pepe/1_idle/idle/I-5.png",
    "Grafics/img/2_character_pepe/1_idle/idle/I-6.png",
    "Grafics/img/2_character_pepe/1_idle/idle/I-7.png",
    "Grafics/img/2_character_pepe/1_idle/idle/I-8.png",
    "Grafics/img/2_character_pepe/1_idle/idle/I-9.png",
    "Grafics/img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_SLEEP = [
    "Grafics/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "Grafics/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "Grafics/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "Grafics/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "Grafics/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "Grafics/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "Grafics/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "Grafics/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "Grafics/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "Grafics/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
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
  speedX = 3;
  jumpDuration = 670; // in ms
  walking_sound = new Audio("audio/running.wav");

  constructor(keyboard) {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.keyboard = keyboard;
    this.applyGravity();

    this.walk();
    // this.jump();
  }

  walk() {
    setInterval(() => {
      this.walking_sound.pause();

      if (this.keyboard.RIGHT && this.x < world.level.LEVEL_END_X) {
        this.moveRight();
        this.walking_sound.play();
      }

      if (this.keyboard.LEFT && this.x > -100) {
        this.moveLeft();
        this.walking_sound.play();
      }

      if (this.keyboard.SPACE && this.isOnTheGround()) {
        this.jump();
      }

      world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      // if (this.isDead()) {
      //   // this.playAnimation(this.IMAGES_DEAD);
      // } else if (this.getsHurt()) {
      //   this.playAnimation(this.IMAGES_HURT)
      // } else

      if (this.isJumping()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.keyboard.RIGHT || this.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 100);
  }

  // jump() {
  //   setInterval(() => {
  //     if (this.keyboard.UP && this.isOnTheGround()) {
  //       this.speedY = 20;
  //     }
  //   }, 1000 / 60);
  // }

  // playJumpAnimation() {
  //   const interval = this.jumpDuration / this.IMAGES_JUMPING.length; // Calcola l'intervallo per ogni frame
  //   let currentFrame = 0;

  //   const jumpAnimation = setInterval(() => {
  //     if (currentFrame < this.IMAGES_JUMPING.length) {
  //       this.img = this.imageCache[this.IMAGES_JUMPING[currentFrame]];
  //       currentFrame++;
  //     } else {
  //       clearInterval(jumpAnimation);
  //     }
  //   }, interval);
  // }
}
