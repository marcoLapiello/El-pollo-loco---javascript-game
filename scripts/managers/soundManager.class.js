/**
 * Manages the sounds in the game.
 */
export class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.soundStates = new Map();
  }

  /**
   * Registers a sound with a specified key and volume.
   * @param {string} key - The key to identify the sound.
   * @param {HTMLAudioElement} audio - The audio element for the sound.
   * @param {number} [volume=1.0] - The volume level of the sound (0.0 to 1.0).
   */
  registerSound(key, audio, volume = 1.0) {
    if (volume < 0 || volume > 1) {
      console.warn(`Volume for sound "${key}" is out of range (0.0 to 1.0). Setting to 1.0 by default.`);
      volume = 1.0;
    }
    audio.volume = volume;
    this.sounds.set(key, audio);
    this.soundStates.set(key, { isPlaying: false });
  }

  /**
   * Plays a sound with the specified key.
   * @param {string} key - The key identifying the sound.
   * @param {boolean} [loop=false] - Whether the sound should loop.
   */
  playSound(key, loop = false) {
    const sound = this.sounds.get(key);
    if (sound) {
      if (sound.paused) {
        sound.loop = loop;
        sound.play();
        this.soundStates.set(key, { isPlaying: true });

        sound.addEventListener('ended', () => {
          this.soundStates.set(key, { isPlaying: false });
        }, { once: true });
      }
    } else {
      console.warn(`Sound with key "${key}" not found.`);
    }
  }

  /**
   * Pauses a sound with the specified key.
   * @param {string} key - The key identifying the sound.
   */
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

  /**
   * Pauses all currently playing sounds.
   */
  pauseAll() {
    this.sounds.forEach((sound, key) => {
      if (!sound.paused) {
        sound.pause();
        this.soundStates.set(key, { isPlaying: true });
      }
    });
  }

  /**
   * Stops all sounds and resets their playback position.
   */
  stopAll() {
    this.sounds.forEach((sound, key) => {
      if (!sound.paused) {
        sound.pause();
        sound.currentTime = 0;
        this.soundStates.set(key, { isPlaying: false });
      }
    });
  }

  /**
   * Resumes all sounds that were playing before being paused.
   */
  resumeAll() {
    this.sounds.forEach((sound, key) => {
      const state = this.soundStates.get(key);
      if (state?.isPlaying) {
        sound.play();
      }
    });
  }

  /**
   * Mutes all sounds.
   */
  muteAll() {
    this.sounds.forEach((sound) => {
      sound.muted = true;
    });
  }

  /**
   * Unmutes all sounds.
   */
  muteAllOff() {
    this.sounds.forEach((sound) => {
      sound.muted = false;
    });
  }
}
