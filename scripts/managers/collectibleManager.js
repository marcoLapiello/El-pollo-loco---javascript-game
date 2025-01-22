import { BottlesOnTheGround } from "../models/bottlesOnTheGround.class.js";
import { Coins } from "../models/coins.class.js";

export class CollectibleManager {
  constructor(character, bottlesBar, coinsBar, soundManager, isSoundMute) {
    this.character = character;
    this.bottlesBar = bottlesBar;
    this.coinsBar = coinsBar;
    this.soundManager = soundManager;
    this.isSoundMute = isSoundMute;
    this.bottlesOnTheGround = [];
    this.coinsAroundTheWorld = [];
    this.ownedBottles = 0;
    this.ownedBottlesPercent = 0;
    this.ownedCoins = 0;
    this.ownedCoinsPercent = 0;
  }

  /**
   * Generates bottles on the ground at random positions.
   * @param {number} numberOfBottles - The number of bottles to generate.
   */
  generateBottleOnTheGrounds(numberOfBottles) {
    for (let i = 0; i < numberOfBottles; i++) {
      let x = 200 + Math.random() * 2000;
      let y = 390;
      let bottleOnTheGround = new BottlesOnTheGround(x, y);
      this.bottlesOnTheGround.push(bottleOnTheGround);
    }
  }

  /**
   * Generates coins around the world at random positions.
   * @param {number} numberOfCoins - The number of coins to generate.
   */
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

  /**
   * Checks if the character collects a bottle.
   */
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

  /**
   * Checks if the character collects a coin.
   */
  checkCollectCoins() {
    this.coinsAroundTheWorld = this.coinsAroundTheWorld.filter((coin) => {
      if (this.character.isColliding(coin) && this.ownedCoins < 100) {
        this.ownedCoins++;
        this.ownedCoinsPercent = this.ownedCoins * 5;
        if (!this.isSoundMute) {
          this.soundManager.playSound("collectCoin");
        }

        this.coinsBar.setStatusBars("COINS", this.ownedCoinsPercent);
        return false;
      }
      return true;
    });
  }
}
