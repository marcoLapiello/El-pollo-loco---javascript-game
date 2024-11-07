class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Clouds()];
  background = [
    new Background("Grafics/img/5_background/layers/air.png", 0, 0),
    new Background("Grafics/img/5_background/layers/3_third_layer/1.png", 0, 0),
    new Background("Grafics/img/5_background/layers/2_second_layer/1.png", 0, 0),
    new Background("Grafics/img/5_background/layers/1_first_layer/1.png", 0, 0)
  ];
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    
    this.addObjectToMap(this.background);
    this.addObjectToMap(this.clouds);
    this.addObjectToMap(this.enemies);
    this.addToMap(this.character);

    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addObjectToMap(object) {
    object.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(movableObject) {
    this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
  }
}
