import { DrawableObjects } from './drawable-objects.class.js';

/**
 * Represents a coin in the game.
 * @extends DrawableObjects
 */
export class Coins extends DrawableObjects {
  offsetX = 33;
  offsetY = 33;
  widthCorrection = 65;
  heightCorrection = 65;

  IMAGES = ["Grafics/img/8_coin/coin_2.png"];

  /**
   * Creates an instance of Coins.
   * @param {number} x - The x-coordinate of the coin.
   * @param {number} y - The y-coordinate of the coin.
   */
  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES[0]);
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
  }
}
