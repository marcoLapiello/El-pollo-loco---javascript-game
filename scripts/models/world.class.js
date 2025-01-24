import { Bottle } from "./bottle.class.js";
import { Character } from "./character.class.js";
import { StatusBars } from "./statusBars.class.js";
import { Endboss } from "./endboss.class.js";
import { Chicken } from "./chicken.class.js";
import { Chick } from "./chick.class.js";
import { intervalManager } from "../managers/intervalManager.class.js";
import { soundManager } from "../game.js";
import { level1 } from "../levels/level1.js";
import { isMobileDevice } from "../game.js";
import { CollectibleManager } from "../managers/collectibleManager.js";
import { draw } from "../utils/drawFunctions.js";
window.isMobileDevice = isMobileDevice;

export class World {
  character = new Character();
  level = level1;
  camera_x = 0;
  bottles = [];
  lastThrownBottleTime = 0;
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
  resetButton = document.getElementById("resetButton");

  /**
   * Creates an instance of the World class.
   * @class
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @param {Object} keyboard - The keyboard input handler.
   * @param {boolean} gameIsStarted - Indicates if the game has started.
   */
  constructor(canvas, keyboard, gameIsStarted) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.gameIsStarted = gameIsStarted;
    this.isGamePaused = false;
    this.firstInputDetected = false;
    this.collectibleManager = new CollectibleManager(this.character, this.bottlesBar, this.coinsBar, soundManager, this.isSoundMute);
    this.addEventListener();
    this.startGame();
  }

  /**
   * Adds event listeners for various game controls.
   */
  addEventListener() {
    this.pauseButton.addEventListener("click", () => this.togglePause());
    this.menuButton.addEventListener("click", () => this.togglePause());
    this.menuBackButton.addEventListener("click", () => this.togglePause());
    this.soundButton.addEventListener("click", () => this.soundMute());
    document.addEventListener("keydown", this.handleFirstInput.bind(this));
    document.addEventListener("touchstart", this.handleFirstInput.bind(this));
    this.resetButton.addEventListener("click", () => this.restartGame());
  }

  /**
   * Sets the world reference for the character.
   */
  setWorld() {
    this.character.world = this;
    // this.character.world.startTime = this.startTime;
  }

  /**
   * Starts the game by initializing various components and starting the game engine.
   */
  startGame() {
    this.gameIsStarted = true;
    this.runGameEngine();
    this.startAnimations();
    this.cleanUpDeadEnemies();
    this.setWorld();
    this.collectibleManager.generateBottleOnTheGrounds(20);
    this.collectibleManager.generateCoinsAroundTheWorld(20);
    soundManager.playSound("gameSound-music", true);
    if (isMobileDevice()) {
      this.toggleMobileBtns("show");
    }
  }

  /**
   * Runs the game engine by registering the animation update function.
   */
  runGameEngine() {
    if (!this.gameIsStarted) return;
    intervalManager.registerAnimation(this, {
      update: () => {
        this.updateGameState();
      },
    });
  }

  /**
   * Updates the game state by drawing the game elements and checking various conditions.
   */
  updateGameState() {
    draw(this.ctx, this);
    this.checkCollision();
    this.handleThrowBottle();
    this.collectibleManager.checkCollectBottle();
    this.collectibleManager.checkCollectCoins();
    this.killEnemies();
    this.handleBoss();
    this.checkWhoWon();
  }

  /**
   * Starts animations for clouds and the character.
   */
  startAnimations() {
    this.level.clouds.forEach((cloud) => cloud.registerAnimation());
    this.character.registerAnimation();
  }

  /**
   * Handles the first input from the user to start enemy animations.
   * @param {Event} event - The input event.
   */
  handleFirstInput(event) {
    if (!this.firstInputDetected && this.controlsPressed(event)) {
      this.firstInputDetected = true;
      this.startEnemiesAnimations();
      document.removeEventListener("keydown", this.handleFirstInput.bind(this));
      document.removeEventListener("touchstart", this.handleFirstInput.bind(this));
    }
  }

  /**
   * Checks if the controls are pressed.
   * @param {Event} event - The input event.
   * @returns {boolean} True if controls are pressed, false otherwise.
   */
  controlsPressed(event) {
    return (
      event.code == "ArrowLeft" ||
      event.code == "ArrowRight" ||
      event.code == "Space" ||
      event.code == "KeyB" ||
      event.target.id == "leftBtn" ||
      event.target.id == "rightBtn" ||
      event.target.id == "jumpBtnRight" ||
      event.target.id == "jumpBtnLeft" ||
      event.target.id == "throwBtnRight" ||
      event.target.id == "throwBtnLeft"
    );
  }

  /**
   * Starts animations for enemies.
   */
  startEnemiesAnimations() {
    this.level.enemies.forEach((enemy) => enemy.registerAnimation());
  }

  /**
   * Stops the game and shows the end screen.
   * @param {string} [endState=""] - The end state of the game ("lost" or "won").
   */
  stopGame(endState = "") {
    soundManager.pauseSound("gameSound-music");
    this.toggleMobileBtns("hide");
    setTimeout(() => {
      intervalManager.clearAllIntervals();
      this.gameIsStarted = false;
      this.showEndScreen(endState);
    }, 1000);
  }

  /**
   * Shows the end screen with the appropriate message.
   * @param {string} endState - The end state of the game ("lost" or "won").
   */
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

  /**
   * Restarts the game by resetting various components and starting the game again.
   */
  restartGame() {
    soundManager.stopAll();
    document.getElementById("canvas").classList.remove("dNone");
    document.getElementById("endScreen").classList.add("dNone");
    document.getElementById("pauseBtn").classList.remove("dNone");
    document.getElementById("soundBtn").classList.remove("dNone");
    this.resetCharacter();
    this.resetCollectibles();
    this.resetEnemies();
    this.firstInputDetected = false;
    this.startGame();
  }

  /**
   * Resets the enemies in the game.
   */
  resetEnemies() {
    this.nrOfChicken = 12;
    this.nrOfChicks = 10;
    this.nrOfBoss = 1;
    this.level.enemies = [];
    for (let i = 0; i < this.nrOfChicken; i++) {
      this.level.enemies.push(new Chicken());
    }
    for (let i = 0; i < this.nrOfChicks; i++) {
      this.level.enemies.push(new Chick());
    }
    for (let i = 0; i < this.nrOfBoss; i++) {
      this.level.enemies.push(new Endboss());
    }
  }

  /**
   * Resets the collectibles in the game.
   */
  resetCollectibles() {
    this.collectibleManager = new CollectibleManager(this.character, this.bottlesBar, this.coinsBar, soundManager, this.isSoundMute);
    this.bottlesBar.setStatusBars("BOTTLES", this.collectibleManager.ownedBottlesPercent);
    this.coinsBar.setStatusBars("COINS", this.collectibleManager.ownedCoinsPercent);
  }

  /**
   * Resets the character in the game.
   */
  resetCharacter() {
    this.character = 0;
    this.character = new Character();
    this.healthBar.setStatusBars("HEALTH", this.character.health);
  }

  /**
   * Toggles the visibility of mobile buttons based on the action provided.
   * @param {string} [action=""] - The action to perform ("show" or "hide").
   */
  toggleMobileBtns(action = "") {
    const mobileBtnIds = ["leftBtn", "rightBtn", "jumpBtnRight", "jumpBtnLeft", "throwBtnRight", "throwBtnLeft"];
    mobileBtnIds.forEach((btnId) => {
      const btn = document.getElementById(btnId);
      btn.classList.toggle("dNone", action === "hide");
      if (action === "show") btn.classList.remove("dNone");
    });
  }

  /**
   * Checks who won the game based on the health of the character and the endboss.
   */
  checkWhoWon() {
    const endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    const character = this.character;
    if (endboss.x <= -100 || character.health <= 0) {
      this.stopGame("lost");
    } else if (endboss.health <= 0) {
      this.stopGame("won");
    }
  }

  /**
   * Toggles the pause state of the game.
   */
  togglePause() {
    this.isGamePaused = !this.isGamePaused;
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

  /**
   * Pauses the game by stopping animations and sounds.
   */
  pauseGame() {
    let activeBtn = true;
    intervalManager.pauseGame();
    soundManager.pauseAll();
    this.pauseButton.blur();
    this.toggleActivePauseButton(activeBtn);
  }

  /**
   * Resumes the game by restarting animations and sounds.
   */
  resumeGame() {
    let activeBtn = false;
    intervalManager.resumeGame();
    soundManager.resumeAll();
    this.pauseButton.blur();
    this.toggleActivePauseButton(activeBtn);
  }

  /**
   * Toggles the active state of the pause button.
   * @param {boolean} activeBtn - Indicates if the pause button should be active.
   */
  toggleActivePauseButton(activeBtn) {
    document.getElementById("pauseBtn").classList.toggle("pauseActive", activeBtn);
  }

  /**
   * Toggles the mute state of the game sounds.
   */
  soundMute() {
    this.isSoundMute = !this.isSoundMute;
    if (this.isSoundMute) {
      soundManager.muteAll();
      this.soundButton.classList.add("noSound");
    } else {
      soundManager.muteAllOff();
      this.soundButton.classList.remove("noSound");
    }
    this.soundButton.blur();
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isInTheAir() && enemy.health > 0) {
        if (enemy.type === "chick" && this.character.health > 0) {
          enemy.getsHit();
        } else {
          this.character.getsHit();
          this.healthBar.setStatusBars("HEALTH", this.character.health);
        }
      }
    });
  }

  /**
   * Checks if the character is jumping on an enemy.
   * @param {Object} enemy - The enemy to check.
   * @returns {boolean} True if the character is jumping on the enemy, false otherwise.
   */
  isCharacterJumpingOnEnemy(enemy) {
    return (
      this.character.isInTheAir() && this.character.speedY < 0 && this.character.isColliding(enemy) && !(enemy instanceof Endboss) && enemy.health > 0
    );
  }

  /**
   * Handles the logic for throwing a bottle.
   */
  handleThrowBottle() {
    let timePassed = this.handleThrowBottleTime();
    if (this.keyboard.B && this.collectibleManager.ownedBottles > 0 && timePassed > 0.5 && !this.character.getsHurt()) {
      let bottle = new Bottle(this.character.x + 80, this.character.y + 140, this.isSoundMute, this.character.facingLeft);
      this.lastThrownBottleTime = new Date().getTime();
      this.collectibleManager.ownedBottles--;
      this.collectibleManager.ownedBottlesPercent = this.collectibleManager.ownedBottles * 10;
      this.bottlesBar.setStatusBars("BOTTLES", this.collectibleManager.ownedBottlesPercent);
      this.bottles.push(bottle);
    }
  }

  /**
   * Calculates the time passed since the last bottle was thrown.
   * @returns {number} The time passed in seconds.
   */
  handleThrowBottleTime() {
    let timePassed = new Date().getTime() - this.lastThrownBottleTime;
    return timePassed / 1000;
  }

  /**
   * Handles the collision between a bottle and an enemy.
   * @param {Object} enemy - The enemy that was hit.
   * @param {Object} collidingBottle - The bottle that collided with the enemy.
   */
  handleBottleCollision(enemy, collidingBottle) {
    collidingBottle.isBreaking = true;
    enemy.getsHit();

    if (enemy instanceof Endboss) {
      this.bossBar.setStatusBars("BOSS", enemy.health);
    }
  }

  /**
   * Handles the behavior and combat mechanics of the boss.
   */
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

  /**
   * Handles the logic for killing enemies.
   */
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

  /**
   * Cleans up dead enemies from the game.
   */
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
}
