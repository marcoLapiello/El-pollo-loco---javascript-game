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
  // world;
  // camera_x;
  speed = 3;

  constructor() {
    super().loadImage("Grafics/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);

    this.walk();
  }

  walk() {
    setInterval(() => {
      if (this.keyboard.RIGHT) {
        this.x += this.speed;
        this.facingLeft = false;
      } else if (this.keyboard.LEFT) {
        this.x -= this.speed;
        this.facingLeft = true;
      }
      world.camera_x = -this.x;
    }, 1000 / 60);

    setInterval(() => {
      if (this.keyboard.RIGHT || this.keyboard.LEFT) {
        let index = this.currentImageIndex % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[index];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
      }
    }, 100);

    // setInterval(() => {
    //   if (this.world.keyboard.RIGHT) {
    //     let index = this.currentImageIndex % this.IMAGES_WALKING.length;
    //     let path = this.IMAGES_WALKING[index];
    //     this.img = this.imageCache[path];
    //     this.currentImageIndex++;
    //   }
    // }, 100);
  }

  jump() {}
}
