class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  bottles = [];
  lastThrownBottleTime = 0;
  ownedBottles = 0;
  ownedBottlesPercent = 0;
  ownedCoins = 0;
  ownedCoinsPercent = 0;
  bottlesOnTheGround = [];
  coinsAroundTheWorld = [];
  healthBar = new StatusBars("HEALTH", 0, this.character.health, this);
  bottlesBar = new StatusBars("BOTTLES", 40, this.ownedBottles, this);
  coinsBar = new StatusBars("COINS", 80, this.ownedCoins, this);
  bossBar = new StatusBars("BOSS", 120, 100, this);

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
      this.killEnemies();
      this.handleBoss();
    }, 50);
  }

  handleBoss() {
    const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    this.bossBar.update(endboss);
    let distancefromCharacter = endboss.x - this.character.x;
    if (distancefromCharacter < endboss.startWalkingDistanceX && distancefromCharacter > endboss.startAttackingDistanceX) {
      endboss.switchWalkingAttacking(true, false);
    } else if (distancefromCharacter < endboss.startAttackingDistanceX) {
      endboss.switchWalkingAttacking(false, true);
    }
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
      if (this.character.isColliding(enemy) && !this.character.isInTheAir()) {
        this.character.getsHit();
        this.healthBar.setStatusBars("HEALTH", this.character.health);
      }
    });
  }

  handleThrowBottle() {
    let timePassed = this.handleThrowBottleTime();
    if (this.keyboard.B && !this.character.facingLeft && this.ownedBottles > 0 && timePassed > 0.5) {
      let bottle = new Bottle(this.character.x + 80, this.character.y + 140);
      this.lastThrownBottleTime = new Date().getTime();
      this.ownedBottles--;
      this.ownedBottlesPercent = this.ownedBottles * 10;
      this.bottlesBar.setStatusBars("BOTTLES", this.ownedBottlesPercent);
      this.bottles.push(bottle);
    }
  }

  handleThrowBottleTime() {
    let timePassed = new Date().getTime() - this.lastThrownBottleTime; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    return timePassed;
  }

  killEnemies() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      let collidingBottle = this.bottles.find((bottle) => bottle.isColliding(enemy));
      if (this.character.isInTheAir() && this.character.isColliding(enemy) && !(enemy instanceof Endboss)) {
        return false; // Remove this exact (enemy) from the array if it s a chicken
      } else if (collidingBottle) {
        if (enemy instanceof Endboss) {
          collidingBottle.isBreaking = true;
          enemy.getsHit();
          this.bossBar.setStatusBars("BOSS", enemy.health);
        } else {
          collidingBottle.isBreaking = true;
          return false;
        }
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
    this.addToMap(this.bossBar);
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
    if (drawableObject.facingLeft) {
      this.drawObjectFacingLeft(drawableObject);
    } else {
      this.ctx.drawImage(drawableObject.img, drawableObject.x, drawableObject.y, drawableObject.width, drawableObject.height);
    }
    this.ctx.restore();
  }

  drawObjectFacingLeft(drawableObject) {
    this.ctx.translate(drawableObject.x + drawableObject.width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(drawableObject.img, 0, drawableObject.y, drawableObject.width, drawableObject.height);
  }
}
