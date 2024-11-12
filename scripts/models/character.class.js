class Character extends MovableObject {
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
  keyboard;
  speed = 3;
  walking_sound = new Audio('audio/running.wav');

  constructor() {
    super().loadImage("Grafics/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);

    this.walk();
  }

  walk() {
    setInterval(() => {
      this.walking_sound.pause();
      
      if (this.keyboard.RIGHT && this.x < world.level.LEVEL_END_X) {
        this.x += this.speed;
        this.facingLeft = false;
        this.walking_sound.play();
      } else if (this.keyboard.LEFT && this.x > -100) {
        this.x -= this.speed;
        this.facingLeft = true;
        this.walking_sound.play();
      }
      world.camera_x = -this.x + 100;
    }, 1000 / 60);
    
    setInterval(() => {
      if (this.keyboard.RIGHT || this.keyboard.LEFT) {
        this.playAnimation();
      }
    }, 100);
  }

  jump() {}
}
