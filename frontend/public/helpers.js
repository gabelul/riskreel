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

window.initTheme = (p) => {
  window.THEME = {
    colors: {
      gold: '#FFD700',
      neonGold: '#FFE87C',
      orange: '#FFA500',
      darkBlue: '#1A1A2E',
      lightBlue: '#4169E1',
      black: '#000000',
      white: '#FFFFFF'
    },
    
    layout: {
      // Main game area
      gameWidth: Math.min(p.windowWidth * 0.9, 1200),
      gameHeight: Math.min(p.windowHeight * 0.9, 800),
      
      // Reel dimensions
      reelWidth: 180,
      reelHeight: 180,
      reelSpacing: 10,
      
      // Header
      headerHeight: 100,
      
      // Control panel
      controlHeight: 120,
      buttonWidth: 160,
      buttonHeight: 60,
      
      // Paylines
      paylineWidth: 40,
      paylineSpacing: 60
    },
    
    symbols: [
      { char: '☥', name: 'ankh', value: 500 },
      { char: '👁', name: 'eye', value: 200 },
      { char: '🪲', name: 'scarab', value: 100 },
      { char: '🔺', name: 'pyramid', value: 50 },
      { char: '⚘', name: 'lotus', value: 20 }
    ],
    
    glow: {
      strong: 20,
      medium: 15,
      weak: 10
    }
  };
};

// Utility function for neon glow effect
window.drawNeonRect = (p, x, y, w, h, color, glowStrength = THEME.glow.medium) => {
  p.drawingContext.shadowBlur = glowStrength;
  p.drawingContext.shadowColor = color;
  p.stroke(color);
  p.strokeWeight(3);
  p.noFill();
  p.rect(x, y, w, h, 15);
  p.drawingContext.shadowBlur = 0;
};

window.drawNeonText = (p, text, x, y, color, size, glowStrength = THEME.glow.medium) => {
  p.drawingContext.shadowBlur = glowStrength;
  p.drawingContext.shadowColor = color;
  p.fill(color);
  p.noStroke();
  p.textSize(size);
  p.textAlign(p.CENTER, p.CENTER);
  p.text(text, x, y);
  p.drawingContext.shadowBlur = 0;
};

console.log('Helpers loaded');