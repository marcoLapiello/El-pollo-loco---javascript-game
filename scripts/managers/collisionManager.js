export class CollisionManager {
  constructor(character, level, healthBar) {
    this.character = character;
    this.level = level;
    this.healthBar = healthBar;
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
   * @param {Object} enemy - The enemy to check collision with.
   * @returns {boolean} True if the character is jumping on the enemy, false otherwise.
   */
  isCharacterJumpingOnEnemy(enemy) {
    return (
      this.character.isInTheAir() && this.character.speedY < 0 && this.character.isColliding(enemy) && !(enemy instanceof Endboss) && enemy.health > 0
    );
  }
}
