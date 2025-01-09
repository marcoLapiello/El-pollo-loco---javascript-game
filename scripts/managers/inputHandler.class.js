export class InputHandler {
  constructor() {
    this.keys = { UP: false, DOWN: false, LEFT: false, RIGHT: false, SPACE: false, B: false };
    this.initEventListeners();
  }

  initEventListeners() {
    window.addEventListener("keydown", (event) => this.keyDown(event));
    window.addEventListener("keyup", (event) => this.keyUp(event));
  }

  keyDown(event) {
    
    switch (event.code) {
      case "ArrowUp":
        this.keys.UP = true;
        break;
      case "ArrowDown":
        this.keys.DOWN = true;
        break;
      case "ArrowLeft":
        this.keys.LEFT = true;
        break;
      case "ArrowRight":
        this.keys.RIGHT = true;
        break;
      case "Space":
        this.keys.SPACE = true;
        break;
      case "KeyB":
        this.keys.B = true;
        break;
    }
    
  }

  keyUp(event) {
    
    switch (event.code) {
      case "ArrowUp":
        this.keys.UP = false;
        break;
      case "ArrowDown":
        this.keys.DOWN = false;
        break;
      case "ArrowLeft":
        this.keys.LEFT = false;
        break;
      case "ArrowRight":
        this.keys.RIGHT = false;
        break;
      case "Space":
        this.keys.SPACE = false;
        break;
      case "KeyB":
        this.keys.B = false;
        break;
    }
    
  }

  isPressed(key) {
    return this.keys[key];
  }

  resetKeys() {
    this.keys = { UP: false, DOWN: false, LEFT: false, RIGHT: false, SPACE: false, B: false };
  }
}

export const inputHandler = new InputHandler(); // Esporta un'istanza globale

