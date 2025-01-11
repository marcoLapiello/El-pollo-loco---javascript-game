import { Bottle } from "./bottle.class.js";
import { BottlesOnTheGround } from "./bottlesOnTheGround.class.js";
import { Coins } from "./coins.class.js";
import { Character } from "./character.class.js";
import { StatusBars } from "./statusBars.class.js";
import { Endboss } from "./endboss.class.js";
import { intervalManager } from "../managers/intervalManager.class.js";

import { level1 } from "../levels/level1.js";

export class World {
  gameIsStarted;
  character = new Character();
  level = level1;
  canvas;
  ctx;
  // inputHandler;
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
  breakingBottle_Sound = new Audio("audio/glass-shatter-sound.wav");
  killedChicken_Sound = new Audio("audio/splatting_Chicken.wav");
  chickenSound = new Audio("audio/chicken_comes_closer.mp3");
  chickenSoundInterval = null;
  intervalId = null;
  

  constructor(canvas, keyboard, gameIsStarted) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    // this.inputHandler = inputHandler;
    this.gameIsStarted = gameIsStarted;

    // this.character = new Character(); // Crea il personaggio
    // this.character.setWorld(this); // Assegna il riferimento al mondo

    this.generateBottleOnTheGrounds(20);
    this.generateCoinsAroundTheWorld(20);
    this.draw();
    this.setWorld();
    this.run();
    this.cleanUpDeadEnemies();
  }

  setWorld() {
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
    const minDistance = 50;
    let possibleYValues = [150, 300];
    let x = 200;

    for (let i = 0; i < numberOfCoins; i++) {
      let y = possibleYValues[Math.floor(Math.random() * possibleYValues.length)];

      if (i % 3 === 0 && i !== 0) {
        x += minDistance * 3;
      } else {
        x += minDistance;
      }

      if (x > 2200) {
        x = 200 + (x - 2200);
      }

      let coin = new Coins(x, y);
      this.coinsAroundTheWorld.push(coin);
    }
  }

  run() {
    if (!this.gameIsStarted) return;

    intervalManager.registerAnimation(this, {
      update: () => {
        this.updateGameState();
        if (this.character.health <= 0) {
          intervalManager.clearAllIntervals();
        }
      },
    });
  }

  updateGameState() {
    this.checkCollision();
    this.handleThrowBottle();
    this.checkCollectBottle();
    this.checkCollectCoins();
    this.killEnemies();
    this.handleBoss();
    this.playChickenSound();
  }

  stopGame() {
    this.gameIsStarted = false;
    intervalManager.unregisterAnimation(this); // Rimuove l'aggiornamento registrato
    this.stopChickenSound();
  }

  stopChickenSound() {
    intervalManager.clearInterval(this.chickenSoundInterval);
    this.chickenSoundInterval = null;
  }

  handleBoss() {
    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    this.bossBar.updateBossBar(endboss);
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
        this.ownedBottlesPercent = this.ownedBottles * 10;
        this.bottlesBar.setStatusBars("BOTTLES", this.ownedBottlesPercent);
        return false;
      }
      return true;
    });
  }

  checkCollectCoins() {
    this.coinsAroundTheWorld = this.coinsAroundTheWorld.filter((coin) => {
      if (this.character.isColliding(coin) && this.ownedCoins < 100) {
        this.ownedCoins++;
        this.ownedCoinsPercent = this.ownedCoins * 5;
        this.coinsBar.setStatusBars("COINS", this.ownedCoinsPercent);
        return false;
      }
      return true;
    });
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isInTheAir() && enemy.health > 0) {
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
    let timePassed = new Date().getTime() - this.lastThrownBottleTime;
    timePassed = timePassed / 1000;
    return timePassed;
  }

  killEnemies() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      let collidingBottle = this.bottles.find((bottle) => bottle.isColliding(enemy));
      if (this.character.isInTheAir() && this.character.isColliding(enemy) && !(enemy instanceof Endboss) && enemy.health > 0) {
        this.killedChicken_Sound.play();
        enemy.getsHit();
      } else if (collidingBottle) {
        if (enemy instanceof Endboss) {
          collidingBottle.isBreaking = true;
          this.breakingBottle_Sound.play();
          enemy.getsHit();
          this.bossBar.setStatusBars("BOSS", enemy.health);
        } else {
          collidingBottle.isBreaking = true;
          this.breakingBottle_Sound.play();
          enemy.getsHit();
        }
      }
      return true;
    });
  }

  cleanUpDeadEnemies() {
    setInterval(() => {
      this.level.enemies = this.level.enemies.filter((enemyToRemove) => {
        if (enemyToRemove.isDead() && !(enemyToRemove instanceof Endboss)) {
          return false;
        }
        return true;
      });
    }, 2000);
  }

  playChickenSound() {
    if (this.chickenSoundInterval) return; // Prevent multiple intervals

    this.chickenSound.play();
    this.chickenSoundInterval = intervalManager.setInterval(() => {
      this.chickenSound.play();
    }, 5000);
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
