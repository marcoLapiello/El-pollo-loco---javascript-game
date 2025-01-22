import { MovableObject } from "./movable-object.class.js";

/**
 * Represents the background in the game.
 * @extends MovableObject
 */
export class Background extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates an instance of Background.
     * @param {string} imagePath - The path to the background image.
     * @param {number} x - The x-coordinate of the background.
     * @param {number} y - The y-coordinate of the background.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}