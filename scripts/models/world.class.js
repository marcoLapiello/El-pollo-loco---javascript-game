class World {
  character = new Character();
  bottles = [];
  ownedBottles = 0; // Normally set a t Zero and increases as the bottle get collected
  ownedBottlesPercent = 0; // normally set at Zero and increases as the bottle get collected
  ownedCoins = 0; // Normally set a t Zero and increases as the coins get collected
  bottlesOnTheGround = [];
  coinsAroundTheWorld = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthBar = new StatusBars("HEALTH", 0, this.character.health);
  bottlesBar = new StatusBars("BOTTLES", 40, this.ownedBottles);
  coinsBar = new StatusBars("COINS", 80, this.ownedCoins);

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.generateBottleOnTheGrounds(20);
    this.generateCoinsAroundTheWorld(40);
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    // currently just needed for the keyboard in character
    this.character.world = this;
  }

  generateBottleOnTheGrounds(numberOfBottles) {
    for (let i = 0; i < numberOfBottles; i++) {
      let x = 200 + Math.random() * 2000;
      let y = 390;
      let bottleOnTheGround = new BottlesOnTheGround(x, y);
      this.bottlesOnTheGround.push(bottleOnTheGround);
    }
  }

  generateCoinsAroundTheWorld(numberOfCoins) {
    for (let i = 0; i < numberOfCoins; i++) {
      let x = 200 + Math.random() * 2000;
      let y = 100 + Math.random() * 300;
      let coin = new Coins(x, y);
      this.coinsAroundTheWorld.push(coin);
    }
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.handleThrowBottle();
      this.checkCollectBottle();
      this.checkCollectCoins();
    }, 200);
  }

  checkCollectBottle() {
    this.bottlesOnTheGround = this.bottlesOnTheGround.filter((bottle) => {
      if (this.character.isColliding(bottle) && this.ownedBottles < 10) {
        this.ownedBottles++;
        this.ownedBottlesPercent = this.ownedBottles * 10;
        this.bottlesBar.setStatusBars("BOTTLES", this.ownedBottlesPercent);
        return false; // Remove bottle from the array
      }
      return true;
    });
  }

  checkCollectCoins() {
    this.coinsAroundTheWorld = this.coinsAroundTheWorld.filter((coin) => {
      if (this.character.isColliding(coin) && this.ownedCoins < 100) {
        this.ownedCoins++;
        this.coinsBar.setStatusBars("COINS", this.ownedCoins);
        return false; // Remove coin from the array
      }
      return true;
    });
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.getsHit();
        this.healthBar.setStatusBars("HEALTH", this.character.health);
      }
    });
  }

  handleThrowBottle() {
    if (this.keyboard.B && !this.character.facingLeft && this.ownedBottles > 0) {
      let bottle = new Bottle(this.character.x + 80, this.character.y + 140);
      this.ownedBottles--;
      this.ownedBottlesPercent = this.ownedBottles * 10;
      console.log(this.ownedBottles);
      console.log(this.ownedBottlesPercent);
      this.bottlesBar.setStatusBars("BOTTLES", this.ownedBottlesPercent);
      this.bottles.push(bottle);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.background);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.bottlesOnTheGround);
    this.addObjectToMap(this.coinsAroundTheWorld);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.bottles);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthBar);
    this.addToMap(this.bottlesBar);
    this.addToMap(this.coinsBar);

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

    if (
      movableObject instanceof BottlesOnTheGround ||
      movableObject instanceof Character ||
      movableObject instanceof Chicken ||
      movableObject instanceof Endboss
    ) {
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
