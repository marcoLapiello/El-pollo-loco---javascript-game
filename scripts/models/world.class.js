class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Clouds()];
  background = [
    new Background("Grafics/img/5_background/layers/air.png", 0, 0),
    new Background("Grafics/img/5_background/layers/3_third_layer/1.png", 0, 0),
    new Background("Grafics/img/5_background/layers/2_second_layer/1.png", 0, 0),
    new Background("Grafics/img/5_background/layers/1_first_layer/1.png", 0, 0),
  ];
  canvas;
  ctx;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    // this.character.keyboard = this.keyboard;
    this.setKeyboard();

    // this.setWorld(); Junus Code

    this.draw();
  }

  setKeyboard() {
    this.character.keyboard = this.keyboard;
  }

  // setWorld() {
  //   this.character.world = this; Junus Code
  // }

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

  // addToMap(movableObject) {        Junus Code
  //   if (movableObject.facingLeft) {
  //     this.ctx.save();
  //     this.ctx.translate(movableObject.width, 0)
  //     this.ctx.scale(-1, 1);
  //     movableObject.x = movableObject.x * -1;
  //   } 
  //   this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
  //   if (movableObject.facingLeft) {
  //     movableObject.x = movableObject.x * -1;
  //     this.ctx.restore();
  //   }
  // }

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
