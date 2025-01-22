/**
 * Represents a game level.
 */
export class Level {
  enemies;
  clouds;
  background;
  LEVEL_END_X = 2876;

  /**
   * Creates an instance of Level.
   * @param {Array} enemies - The enemies in the level.
   * @param {Array} clouds - The clouds in the level.
   * @param {Array} background - The background elements of the level.
   */
  constructor(enemies, clouds, background) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.background = background;
  }
}
