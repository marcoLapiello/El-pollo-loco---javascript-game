import { MovableObject } from "./movable-object.class.js"; 

export class Background extends MovableObject {
    width = 720;
    height = 480;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}