class IntervalManager {
  constructor() {
    this.intervals = [];
    this.animations = [];
    this.animationLoop = null;
    this.isPaused = false;
  }

  /**
   * Creates an interval and stores its ID.
   * @param {Function} callback - The function to execute at each interval.
   * @param {number} delay - The time, in milliseconds, the timer should delay between executions.
   * @returns {number} The ID of the interval.
   */
  setInterval(callback, delay) {
    const id = setInterval(callback, delay);
    this.intervals.push(id);
    return id;
  }

  /**
   * Clears a specific interval.
   * @param {number} id - The ID of the interval to clear.
   */
  clearInterval(id) {
    clearInterval(id);
    this.intervals = this.intervals.filter((intervalId) => intervalId !== id);
  }

  /**
   * Clears all intervals.
   */
  clearAllIntervals() {
    this.animations.forEach((id) => clearInterval(id));
    this.animations = [];
  }

  /**
   * Registers a centralized animation.
   * @param {Object} object - The object to animate.
   * @param {Object} config - The configuration for the animation.
   * @param {Function} config.update - The update function for the animation.
   */
  registerAnimation(object, config) {
    const animation = {
      object,
      update: config.update,
    };
    this.animations.push(animation);
    this.startAnimation();
  }

  /**
   * Starts the centralized animation loop.
   */
  startAnimation() {
    if (!this.animationLoop) {
      this.animationLoop = this.setInterval(() => {
        if (!this.isPaused) {
          this.animations.forEach((animation) => {
            animation.update();
          });
        }
      }, 1000 / 60);
    }
  }

  /**
   * Pauses the game by stopping the animation updates.
   */
  pauseGame() {
    this.isPaused = true;
  }

  /**
   * Resumes the game by restarting the animation updates.
   */
  resumeGame() {
    this.isPaused = false;
  }

  /**
   * Unregisters a specific animation.
   * @param {Object} object - The object to stop animating.
   */
  unregisterAnimation(object) {
    this.animations = this.animations.filter(
      (animation) => animation.object !== object
    );
    if (this.animations.length === 0 && this.animationLoop) {
      this.clearInterval(this.animationLoop);
      this.animationLoop = null;
    }
  }
}

export const intervalManager = new IntervalManager();
