import { DrawableObjects } from './drawable-objects.class.js';
import { healthBarImages, bottlesBarImages, coinsBarImages, bossBarImages } from '../imgsPaths/statusBarsImgs.js';

export class StatusBars extends DrawableObjects {
  world;
  percentage;

  /**
   * Creates an instance of the StatusBars class.
   * @param {string} type - The type of status bar (e.g., "HEALTH", "BOTTLES", "COINS", "BOSS").
   * @param {number} y - The y-coordinate of the status bar.
   * @param {number} percentage - The initial percentage value of the status bar.
   * @param {Object} world - The world object.
   */
  constructor(type, y, percentage, world) {
    super();
    this.x = 20;
    this.y = y;
    this.width = 180;
    this.height = 50;
    this.percentage = percentage;
    this.world = world;
    this.loadImages(healthBarImages);
    this.loadImages(bottlesBarImages);
    this.loadImages(coinsBarImages);
    this.loadImages(bossBarImages);
    this.setStatusBars(type, this.percentage);
  }

  /**
   * Updates the position of the boss bar based on the boss's position.
   * @param {Object} endboss - The endboss object.
   */
  updateBossBar(endboss) {
    if (endboss) {
      this.x = endboss.x + endboss.width / 2 - this.width / 2;
      this.y = endboss.y - 20;
    }
  }

  /**
   * Sets the status bar type and percentage.
   * @param {string} type - The type of status bar (e.g., "HEALTH", "BOTTLES", "COINS", "BOSS").
   * @param {number} percentage - The percentage value of the status bar.
   */
  setStatusBars(type, percentage) {
    switch (type) {
      case "HEALTH":
        this.imgArray = healthBarImages;
        break;
      case "BOTTLES":
        this.imgArray = bottlesBarImages;
        break;
      case "COINS":
        this.imgArray = coinsBarImages;
        break;
      case "BOSS":
        this.imgArray = bossBarImages;
        break;
      default:
        this.imgArray = [];
    }
    this.percentage = percentage;
    this.setPercentage(this.percentage, this.imgArray);
  }

  /**
   * Sets the percentage value and updates the image accordingly.
   * @param {number} percentage - The percentage value of the status bar.
   * @param {Array} imgArray - The array of images for the status bar.
   */
  setPercentage(percentage, imgArray) {
    this.percentage = percentage;
    this.imgArray = imgArray;
    let path = this.imgArray[this.findImgIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Finds the index of the image based on the percentage value.
   * @returns {number} The index of the image.
   */
  findImgIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}

