import { MovableObject } from './movable-object.class.js';
import { intervalManager } from '../managers/intervalManager.class.js';

/**
 * Represents a cloud in the game.
 * @extends MovableObject
 */
export class Clouds extends MovableObject {
  y = 20;
  width = 500;
  height = 300;
  speed = 0.2;

  /**
   * Creates an instance of Clouds.
   */
  constructor() {
    super().loadImage("Grafics/img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 4800;
  }

  /**
   * Registers the cloud animation.
   */
  registerAnimation() {
    intervalManager.registerAnimation(this, {
      update: () => {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
          this.x = 720;
        }
      }
    });
  }
}
