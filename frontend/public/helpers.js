console.log('Loading helpers...');

window.SoundManager = class SoundManager {
  constructor(p) {
    this.p = p;
    this.sounds = {
      spin: null,
      smallWin: null,
      mediumWin: null,
      bigWin: null,
      jackpot: null,
      stop: null
    };
    this.muted = false;
    this.loadSounds();
  }

  loadSounds() {
    // Basic game sounds
    this.addSound('spin', 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3', 0.4);
    this.addSound('stop', 'https://assets.mixkit.co/active_storage/sfx/2004/2004-preview.mp3', 0.3);
    
    // Win variations
    this.addSound('smallWin', 'https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3', 0.4);
    this.addSound('mediumWin', 'https://assets.mixkit.co/active_storage/sfx/2006/2006-preview.mp3', 0.5);
    this.addSound('bigWin', 'https://assets.mixkit.co/active_storage/sfx/2007/2007-preview.mp3', 0.6);
    this.addSound('jackpot', 'https://assets.mixkit.co/active_storage/sfx/2008/2008-preview.mp3', 0.7);
  }

  addSound(name, url, volume = 0.5) {
    this.p.loadSound(url, (sound) => {
      this.sounds[name] = sound;
      sound.setVolume(volume);
      console.log(`Loaded sound: ${name}`);
    });
  }

  playWinSound(winType) {
    if (this.muted) return;
    
    // Stop any playing win sounds
    ['smallWin', 'mediumWin', 'bigWin', 'jackpot'].forEach(type => {
      if (this.sounds[type] && this.sounds[type].isPlaying()) {
        this.sounds[type].stop();
      }
    });

    // Play appropriate win sound
    if (this.sounds[winType]) {
      this.sounds[winType].play();
    }
  }

  play(name) {
    if (!this.muted && this.sounds[name]) {
      if (this.sounds[name].isPlaying()) {
        this.sounds[name].stop();
      }
      this.sounds[name].play();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    // Stop all sounds when muting
    if (this.muted) {
      Object.values(this.sounds).forEach(sound => {
        if (sound && sound.isPlaying()) {
          sound.stop();
        }
      });
    }
    return this.muted;
  }
};

// Wait for p5.js to be available
window.initTheme = (p) => {
  window.THEME = {
    colors: {
      gold: p.color(255, 215, 0),
      sandLight: p.color(255, 243, 224),
      sandDark: p.color(166, 124, 82),
      nileBlue: p.color(13, 71, 161),
      pyramidStone: p.color(141, 110, 99),
      nightSky: p.color(25, 35, 60),
      accent: p.color(255, 87, 34)
    },
    winTypes: {
      smallWin: { minMatch: 2, value: 10 },
      mediumWin: { minMatch: 3, value: 50 },
      bigWin: { minMatch: 4, value: 100 },
      jackpot: { minMatch: 5, value: 500 }
    },
    symbols: [
      { char: '☥', name: 'ankh', value: 100, isSpecial: true },
      { char: '👁', name: 'eye', value: 75, isSpecial: false },
      { char: '🔺', name: 'pyramid', value: 50, isSpecial: false },
      { char: '🪲', name: 'scarab', value: 25, isSpecial: false },
      { char: '⚘', name: 'lotus', value: 10, isSpecial: false }
    ],
    ui: {
      reelWidth: 100,
      reelHeight: 100,
      spacing: 20,
      cornerRadius: 15,
      glowStrength: 15,
      spinDuration: 2000
    }
  };
};

window.drawGlowingText = (text, x, y, fillColor, size, glow = window.THEME.ui.glowStrength) => {
  push();
  drawingContext.shadowBlur = glow;
  drawingContext.shadowColor = color(255, 215, 0).toString();
  fill(fillColor);
  noStroke();
  textSize(size);
  textAlign(CENTER, CENTER);
  text(text, x, y);
  drawingContext.shadowBlur = 0;
  pop();
};

console.log('Helpers loaded');