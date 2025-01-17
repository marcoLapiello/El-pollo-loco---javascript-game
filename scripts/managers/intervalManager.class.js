class IntervalManager {
  constructor() {
    this.intervals = []; // Memorizza gli ID degli intervalli
    this.animations = []; // Memorizza gli oggetti animati
    this.animationLoop = null; // Memorizza l'ID dell'intervallo per l'animazione
    this.isPaused = false;
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
    this.animations.forEach((id) => clearInterval(id));
    this.animations = [];
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
        if (!this.isPaused) { // Controlla se il gioco è in pausa
          this.animations.forEach((animation) => {
            animation.update();
          });
        }
      }, 1000 / 60); // 60 FPS
    }
  }

  pauseGame() {
    this.isPaused = true;
  }

  resumeGame() {
    this.isPaused = false;
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
