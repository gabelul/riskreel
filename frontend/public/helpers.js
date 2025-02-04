console.log('Loading helpers...');

window.SoundManager = class SoundManager {
  constructor(p) {
    this.p = p;
    this.sounds = {};
    this.muted = false;
  }

  addSound(name, url) {
    this.p.loadSound(url, (sound) => {
      this.sounds[name] = sound;
      sound.setVolume(0.5); // Set default volume to 50%
      console.log(`Loaded sound: ${name}`);
    });
  }

  play(name) {
    if (!this.muted && this.sounds[name]) {
      // Stop the sound if it's already playing
      if (this.sounds[name].isPlaying()) {
        this.sounds[name].stop();
      }
      this.sounds[name].play();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
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
    symbols: [
      { char: '☥', name: 'ankh', value: 100 },
      { char: '👁', name: 'eye', value: 75 },
      { char: '🔺', name: 'pyramid', value: 50 },
      { char: '🪲', name: 'scarab', value: 25 },
      { char: '⚘', name: 'lotus', value: 10 }
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