class Character extends MovableObject {
  y = 190;
  height = 270;
  width = 135;

  constructor() {
    super().loadImage("Grafics/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages([
      "Grafics/img/2_character_pepe/2_walk/W-21.png",
      "Grafics/img/2_character_pepe/2_walk/W-22.png",
      "Grafics/img/2_character_pepe/2_walk/W-23.png",
      "Grafics/img/2_character_pepe/2_walk/W-24.png",
      "Grafics/img/2_character_pepe/2_walk/W-25.png",
      "Grafics/img/2_character_pepe/2_walk/W-26.png",
    ])
  }

  jump() {}
}
