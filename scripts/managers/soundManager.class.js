export class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.logSounds();
  }

  logSounds() {
    console.log(this.sounds);
    
  }

  registerSound(key, audio) {
    this.sounds.set(key, audio);
  }

  playSound(key, loop = false) {
    const sound = this.sounds.get(key);
    if (sound) {
      if (sound.paused) { // Verifica che il suono sia in pausa prima di riprodurlo
        sound.loop = loop;
        sound.play();
      }
    } else {
      console.warn(`Sound with key "${key}" not found.`);
    }
  }
  
  pauseSound(key) {
    const sound = this.sounds.get(key);
    if (sound) {
      if (!sound.paused) { // Verifica che il suono sia in esecuzione prima di metterlo in pausa
        sound.pause();
      }
    } else {
      console.warn(`Sound with key "${key}" not found.`);
    }
  }
  

  pauseAll() {
    this.sounds.forEach((sound) => {
      sound.pause();
    });
  }

  stopAll() {
    this.sounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  resumeAll() {
    this.sounds.forEach((sound) => {
      if (sound.paused) {
        sound.play();
      }
    });
  }
}
