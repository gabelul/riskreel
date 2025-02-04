console.log('Helpers loading...');

window.THEME = {
  colors: {
    primary: '#F4D03F',
    secondary: '#2980B9', 
    background: '#000000'
  }
};

// Theme constants will go here later
const THEME = {
  colors: {
    primary: '#F4D03F'
  }
};

// Helper functions will go here
function formatNumber(num) {
  return num.toLocaleString();
}

// Any helper functions go here

function checkWinningLine(symbols) {
  const firstSymbol = symbols[0].current;
  return symbols.every(s => s.current === firstSymbol);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function calculateWinProbability(wins, totalSpins) {
  if (totalSpins === 0) return 0;
  return (wins / totalSpins * 100).toFixed(1);
}

function formatCredits(amount) {
  return amount.toLocaleString();
}

function formatMultiplier(value) {
  return `${value.toFixed(1)}x`;
}

function calculateRequiredExperience(level) {
  return Math.round(100 * Math.pow(1.5, level - 1));
}

class SoundManager {
  constructor() {
    this.sounds = {};
    this.muted = false;
  }

  addSound(name, sound) {
    this.sounds[name] = sound;
    this.sounds[name].setVolume(0.5); // Set default volume to 50%
  }

  play(name) {
    if (!this.muted && this.sounds[name]) {
      this.sounds[name].play();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }
}

class UIElement {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hover = false;
  }

  isMouseOver(mx, my) {
    return (mx > this.x && mx < this.x + this.w &&
            my > this.y && my < this.y + this.h);
  }

  drawGlowingBorder(color, strength = 20) {
    drawingContext.shadowBlur = strength;
    drawingContext.shadowColor = color;
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
  }

  clearGlow() {
    drawingContext.shadowBlur = 0;
  }
}

console.log('Helpers loaded!');