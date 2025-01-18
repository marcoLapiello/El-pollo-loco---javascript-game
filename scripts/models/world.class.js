import { Bottle } from "./bottle.class.js";
import { BottlesOnTheGround } from "./bottlesOnTheGround.class.js";
import { Coins } from "./coins.class.js";
import { Character } from "./character.class.js";
import { StatusBars } from "./statusBars.class.js";
import { Endboss } from "./endboss.class.js";
import { intervalManager } from "../managers/intervalManager.class.js";
import { soundManager } from "../game.js";
import { level1 } from "../levels/level1.js";

export class World {
  character = new Character();
  level = level1;
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
  chickenSoundInterval = null;
  intervalId = null;
  gameOverImgPath = "./Grafics/img/9_intro_outro_screens/game_over/game over.png";
  youWinImgPath = "./Grafics/img/9_intro_outro_screens/win/win_2.png";
  isSoundMute = false;
  soundButton = document.getElementById("soundBtn");
  pauseButton = document.getElementById("pauseBtn");
  menuButton = document.getElementById("menuBtn");
  menuBackButton = document.getElementById("menuBackBtn");

  constructor(canvas, keyboard, gameIsStarted) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.gameIsStarted = gameIsStarted;
    this.isGamePaused = false;
    this.addEventListener();
    this.startGame();
  }

  // SETTINGS LISTENERS AND PASSING PROPERTIES

  addEventListener() {
    this.pauseButton.addEventListener("click", () => this.togglePause());
    this.menuButton.addEventListener("click", () => this.togglePause());
    this.menuBackButton.addEventListener("click", () => this.togglePause());
    this.soundButton.addEventListener("click", () => this.soundMute());
  }

  setWorld() {
    this.character.world = this;
  }

  // ALL ABOUT RUNNING AND CEASING THE GAME ENGINE

  startGame() {
    this.gameIsStarted = true;
    this.runGameEngine();
    this.startAnimations();
    this.cleanUpDeadEnemies();
    this.setWorld();
    this.draw();
    this.generateBottleOnTheGrounds(20);
    this.generateCoinsAroundTheWorld(20);
    soundManager.playSound("gameSound-music", true);
  }

  runGameEngine() {
    if (!this.gameIsStarted) return;
    intervalManager.registerAnimation(this, {
      update: () => {
        this.updateGameState();
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
    this.checkWhoWon();
  }

  startAnimations() {
    this.level.clouds.forEach((cloud) => cloud.registerAnimation());
    this.level.enemies.forEach((enemy) => enemy.registerAnimation());
    this.character.registerAnimation();
  }

  stopGame(endState = "") {
    soundManager.pauseSound("gameSound-music");
    setTimeout(() => {
      intervalManager.clearAllIntervals();
      this.showEndScreen(endState);
    }, 2000);
  }

  showEndScreen(endState) {
    const endImg = document.getElementById("endScreenImg");
    if (endState === "lost") {
      endImg.src = this.gameOverImgPath;
      soundManager.playSound("lost");
    } else if (endState === "won") {
      endImg.src = this.youWinImgPath;
      soundManager.playSound("won");
      
    }
    document.getElementById("canvas").classList.add("dNone");
    document.getElementById("endScreen").classList.remove("dNone");
    document.getElementById("pauseBtn").classList.add("dNone");
    document.getElementById("soundBtn").classList.add("dNone");
    document.getElementById("menuBtn").classList.add("dNone");
  }

  checkWhoWon() {
    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    const character = this.character;
    if (endboss.x <= 0 || character.health <= 0) {
      this.stopGame("lost");
    } else if (endboss.health <= 0) {
      this.stopGame("won");
    }
  }

  

  // PAUSE AND SOUND FUNCTIONS

  togglePause() {
    this.isGamePaused = !this.isGamePaused;
    // pause state must only be passed to instances using gravity
    this.character.isGamePaused = this.isGamePaused;
    this.bottles.forEach((bottle) => {
      bottle.isGamePaused = this.isGamePaused;
    });
    if (this.isGamePaused) {
      this.pauseGame();
    } else {
      this.resumeGame();
    }
  }

  pauseGame() {
    let activeBtn = true;
    intervalManager.pauseGame();
    soundManager.pauseAll();
    this.pauseButton.blur();
    this.toggleActivePauseButton(activeBtn);
  }

  resumeGame() {
    let activeBtn = false;
    intervalManager.resumeGame();
    soundManager.resumeAll();
    this.pauseButton.blur();
    this.toggleActivePauseButton(activeBtn);
  }

  toggleActivePauseButton(activeBtn) {
    if (activeBtn) {
      document.getElementById("pauseBtn").classList.add("pauseActive");
    } else {
      document.getElementById("pauseBtn").classList.remove("pauseActive");
    }
  }

  soundMute() {
    if (!this.isSoundMute) {
      this.isSoundMute = true;
      soundManager.muteAll();
      this.soundButton.classList.add("noSound");
      this.soundButton.blur();
    } else if (this.isSoundMute) {
      this.isSoundMute = false;
      soundManager.muteAllOff();
      this.soundButton.classList.remove("noSound");
      this.soundButton.blur();
    }
  }

  // COLLISIONS CHARACTER/ENEMIES

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isInTheAir() && enemy.health > 0) {
        if (enemy.type === "chick") {
          enemy.getsHit();
        } else {
          this.character.getsHit();
          this.healthBar.setStatusBars("HEALTH", this.character.health);
        }
      }  
    });
  }

  isCharacterJumpingOnEnemy(enemy) {
    return (
      this.character.isInTheAir() && this.character.speedY < 0 && this.character.isColliding(enemy) && !(enemy instanceof Endboss) && enemy.health > 0
    );
  }

  // BOTTLES

  handleThrowBottle() {
    let timePassed = this.handleThrowBottleTime();
    if (this.keyboard.B && this.ownedBottles > 0 && timePassed > 0.5) {
      let bottle = new Bottle(this.character.x + 80, this.character.y + 140, this.isSoundMute, this.character.facingLeft);
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

  handleBottleCollision(enemy, collidingBottle) {
    collidingBottle.isBreaking = true;
    enemy.getsHit();

    if (enemy instanceof Endboss) {
      this.bossBar.setStatusBars("BOSS", enemy.health);
    }
  }

  // BOSS BEHAVIOUR AND COMBAT MECHANICS

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

  killEnemies() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      let collidingBottle = this.bottles.find((bottle) => bottle.isColliding(enemy));
      if (this.isCharacterJumpingOnEnemy(enemy)) {
        enemy.getsHit();
      } else if (collidingBottle && enemy.health > 0) {
        this.handleBottleCollision(enemy, collidingBottle);
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

  // ALL ABOUT COLLECTIBLES

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
        if (!this.isSoundMute) {
          soundManager.playSound("collectCoin");
        }

        this.coinsBar.setStatusBars("COINS", this.ownedCoinsPercent);
        return false;
      }
      return true;
    });
  }

  // ALL ABOUT DRAWING

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.background);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.bottlesOnTheGround);
    this.addObjectToMap(this.coinsAroundTheWorld);
    this.addObjectToMap(this.level.enemies);
    // this.level.enemies.forEach((enemy) => {
    //   this.drawFrame(enemy);
    // });
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

  // drawFrame(object) {
  //   this.ctx.strokeStyle = 'red';
  //   this.ctx.lineWidth = 2;
  //   this.ctx.strokeRect(object.x, object.y, object.width, object.height);
  // }
}
