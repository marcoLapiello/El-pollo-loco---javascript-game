export class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.soundStates = new Map();
    // this.logSounds();
  }

  logSounds() {
    console.log(this.sounds);
  }

  registerSound(key, audio, volume = 1.0) {
    if (volume < 0 || volume > 1) {
      console.warn(`Volume for sound "${key}" is out of range (0.0 to 1.0). Setting to 1.0 by default.`);
      volume = 1.0;
    }
    audio.volume = volume; // Imposta il volume del suono
    this.sounds.set(key, audio);
    this.soundStates.set(key, { isPlaying: false });
  }

  playSound(key, loop = false) {
    const sound = this.sounds.get(key);
    if (sound) {
      if (sound.paused) {
        // Verifica che il suono sia in pausa prima di riprodurlo
        sound.loop = loop;
        sound.play();
        this.soundStates.set(key, { isPlaying: true });
      }
    } else {
      console.warn(`Sound with key "${key}" not found.`);
    }
  }

  pauseSound(key) {
    const sound = this.sounds.get(key);
    if (sound) {
      if (!sound.paused) {
        sound.pause();
      }
    } else {
      console.warn(`Sound with key "${key}" not found.`);
    }
  }

  pauseAll() {
    this.sounds.forEach((sound, key) => {
      if (!sound.paused) {
        sound.pause(); // Metti in pausa senza resettare
        this.soundStates.set(key, { isPlaying: true }); // Salva lo stato di riproduzione
      }
    });
  }

  stopAll() {
    this.sounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  resumeAll() {
    this.sounds.forEach((sound, key) => {
      const state = this.soundStates.get(key);
      if (state?.isPlaying) {
        sound.play(); // Riprendi dal punto di pausa
      }
    });
  }

  muteAll() {
    this.sounds.forEach((sound) => {
      sound.muted = true;
    });
  }

  muteAllOff() {
    this.sounds.forEach((sound) => {
      sound.muted = false;
    });
  }
}
