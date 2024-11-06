class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Clouds()];
  background = [
    new Background()
  ]
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addToMap(this.character);

    this.enemies.forEach((enemy) => {
        this.addToMap(enemy);
    });

    this.clouds.forEach((cloud) => {
        this.addToMap(cloud);
      });

    let self = this;
    requestAnimationFrame(() => {
      // this method calls the draw function again and again
      self.draw(); // "this" is not recognized inside this structure
      // that s why we set a variable with value "this"
    });
  }

  addToMap(movableObject){
    this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
  }
}
