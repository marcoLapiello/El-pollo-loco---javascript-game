class Character extends MovableObject {
  y = 190;
  height = 270;
  width = 135;

  constructor() {
    super().loadImage("Grafics/img/2_character_pepe/2_walk/W-21.png");
  }

  jump() {}
}
