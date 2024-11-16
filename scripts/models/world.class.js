class World {
  character = new Character();
  // bottles = [];
  // bottlesOnTheGround = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    
    
    
    this.character.keyboard = this.keyboard;
    // this.generateBottleOnTheGrounds(10);
    // this.healthBar = new StatusBars(this.ctx, this.character.health);

    this.draw();
    this.checkCollision();
    this.run();
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      // this.handleThrowBottle();
    }, 200);
  }

  // handleThrowBottle() {
  //   if (this.keyboard.B && !this.character.facingLeft) {
  //     let bottle = new Bottle(this.character.x + 80, this.character.y + 140);
  //     this.bottles.push(bottle);
  //   }
  // }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.getsHit();
        // this.healthBar.update(this.character.health);
      }
    });
  }

  // generateBottleOnTheGrounds(numberOfBottles) {
  //   for (let i = 0; i < numberOfBottles; i++) {
  //     let x = Math.random() * 2000;
  //     let y = 390;
  //     let bottleOnTheGround = new BottlesOnTheGround(x, y);
  //     this.bottlesOnTheGround.push(bottleOnTheGround);
  //   }
  // }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.background);
    this.addObjectToMap(this.level.clouds);
    // this.addObjectToMap(this.bottlesOnTheGround);
    this.addObjectToMap(this.level.enemies);
    // this.addObjectToMap(this.bottles);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    // this.healthBar.drawHealthBar();

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
    this.ctx.save();

    if (movableObject instanceof Character || movableObject instanceof Chicken || movableObject instanceof Endboss) {
      this.drawFrame(movableObject);
    }

    if (movableObject.facingLeft) {
      this.drawObjectFacingLeft(movableObject);
    } else {
      this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
    }

    this.ctx.restore();
  }

  drawFrame(movableObject) {
    this.ctx.beginPath();
    this.ctx.rect(movableObject.x, movableObject.y, movableObject.width, movableObject.height);
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  drawObjectFacingLeft(movableObject) {
    this.ctx.translate(movableObject.x + movableObject.width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(movableObject.img, 0, movableObject.y, movableObject.width, movableObject.height);
  }
}
