class IntervalManager {
  constructor() {
    this.intervals = []; // Memorizza gli ID degli intervalli
    this.animations = []; // Memorizza gli oggetti animati
    this.logIntervals();
    
  }

  // Crea un intervallo e lo memorizza
  setInterval(callback, delay) {
    const id = setInterval(callback, delay);
    this.intervals.push(id);
    return id;
  }

  // Cancella un intervallo specifico
  clearInterval(id) {
    clearInterval(id);
    this.intervals = this.intervals.filter((intervalId) => intervalId !== id);
  }

  // Cancella tutti gli intervalli
  clearAllIntervals() {
    this.intervals.forEach((id) => clearInterval(id));
    this.intervals = [];
  }

  logIntervals() {
    console.log(this.animations);
  }

  // Registra un'animazione centralizzata
  registerAnimation(object, config) {
    const animation = {
      object,
      update: config.update,
    };
    this.animations.push(animation);
    this.startAnimation();
  }

  // Avvia il loop di animazione centralizzato
  startAnimation() {
    if (!this.animationLoop) {
      this.animationLoop = this.setInterval(() => {
        this.animations.forEach((animation) => {
          animation.update();
        });
      }, 1000 / 60); // 60 FPS
    }
  }

  // Rimuove un'animazione
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
export { IntervalManager };
