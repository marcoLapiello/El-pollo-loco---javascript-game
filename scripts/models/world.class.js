class World {
  character = new Character();
  bottles = [];
  ownedBottles = 0; // Normally set a t Zero and increases as the bottle get collected
  ownedBottlesPercent = 0; // normally set at Zero and increases as the bottle get collected
  ownedCoins = 0; // Normally set a t Zero and increases as the coins get collected
  ownedCoinsPercent = 0; // Normally set a t Zero and increases as the coins get collected
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
    this.generateCoinsAroundTheWorld(20);
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
      let y = 100 + Math.random() * 200;
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
      this.killChicken();
    }, 50);
  }

  checkCollectBottle() {
    this.bottlesOnTheGround = this.bottlesOnTheGround.filter((bottle) => {
      if (this.character.isColliding(bottle) && this.ownedBottles < 10) {
        this.ownedBottles++;
        this.ownedBottlesPercent = this.ownedBottles * 10; // max bottle owned is 10
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
        this.ownedCoinsPercent = this.ownedBottles * 5; // max coins owned is 20
        this.coinsBar.setStatusBars("COINS", this.ownedBottlesPercent);
        return false; // Remove coin from the array
      }
      return true;
    });
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isInTheAir() && this.level.enemies.id !== Endboss) {
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
      this.bottlesBar.setStatusBars("BOTTLES", this.ownedBottlesPercent);
      this.bottles.push(bottle);
    }
  }

  killChicken() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (this.character.isInTheAir() && this.character.isColliding(enemy)) {
        console.log("Character is jumping");
        console.log("Character is colliding with", enemy);
        
        
        return false; // Remove bottle from the array
      }
      return true;
    });
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

  addToMap(drawableObject) {
    this.ctx.save();
    // if (
    //   drawableObject instanceof Coins ||
    //   drawableObject instanceof BottlesOnTheGround ||
    //   drawableObject instanceof Character ||
    //   drawableObject instanceof Chicken ||
    //   drawableObject instanceof Endboss
    // ) {
    //   this.drawFrame(drawableObject);
    // }

    if (drawableObject.facingLeft) {
      this.drawObjectFacingLeft(drawableObject);
    } else {
      this.ctx.drawImage(drawableObject.img, drawableObject.x, drawableObject.y, drawableObject.width, drawableObject.height);
    }

    this.ctx.restore();
  }

  // drawFrame(drawableObject) {
  //   this.ctx.beginPath();
  //   this.ctx.rect(drawableObject.x + drawableObject.offsetX, drawableObject.y + drawableObject.offsetY, drawableObject.width - drawableObject.widthCorrection, drawableObject.height - drawableObject.heightCorrection);
  //   this.ctx.strokeStyle = "red";
  //   this.ctx.lineWidth = 2;
  //   this.ctx.stroke();
  // }

  drawObjectFacingLeft(drawableObject) {
    this.ctx.translate(drawableObject.x + drawableObject.width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(drawableObject.img, 0, drawableObject.y, drawableObject.width, drawableObject.height);
  }
}
