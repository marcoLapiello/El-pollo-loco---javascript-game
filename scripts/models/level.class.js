export class Level {
    enemies;
    clouds;
    background;
    LEVEL_END_X = 2157;

    constructor (enemies, clouds, background) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
    }
}