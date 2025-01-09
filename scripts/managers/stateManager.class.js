class StateManager {
  constructor() {
    this.state = {
      isGameStarted: false,
      isGameOver: false,
      score: 0,
      level: 1,
    };
  }

  // Aggiorna lo stato
  updateState(key, value) {
    if (key in this.state) {
      this.state[key] = value;
    }
  }

  // Ottieni il valore di uno stato
  getState(key) {
    return this.state[key];
  }

  // Resetta lo stato
  resetState() {
    this.state = {
      isGameStarted: false,
      isGameOver: false,
      score: 0,
      level: 1,
    };
  }
}

// Esporta un'istanza del gestore
export const stateManager = new StateManager();
