class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.character.keyboard = this.keyboard;

    this.draw();
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.background);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

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
    this.ctx.save(); // Salva lo stato corrente del contesto
  
    if (movableObject.facingLeft) {
      this.ctx.translate(movableObject.x + movableObject.width, 0); // Trasla il contesto verso destra dell'immagine
      this.ctx.scale(-1, 1); // Riflette l'immagine lungo l'asse x
      this.ctx.drawImage(
        movableObject.img,
        0, // L'immagine ora parte dalla posizione traslata
        movableObject.y,
        movableObject.width,
        movableObject.height
      );
    } else {
      this.ctx.drawImage(
        movableObject.img,
        movableObject.x,
        movableObject.y,
        movableObject.width,
        movableObject.height
      );
    }
  
    this.ctx.restore(); // Ripristina lo stato del contesto originale
  }
}
