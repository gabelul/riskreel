console.log('Helpers loading...');

window.THEME = {
  colors: {
    primary: '#F4D03F',      // Egyptian Gold
    secondary: '#2980B9',    // Nile Blue
    accent: '#E67E22',       // Desert Orange
    dark: '#34495E',         // Night Sky
    darker: '#2C3E50',       // Deep Night
    light: '#ECF0F1',        // Sand Light
    background: '#1C2833'    // Temple Dark
  },
  symbols: {
    ankh: { char: '☥', value: 50 },
    eye: { char: '👁', value: 40 },
    pyramid: { char: '🔺', value: 30 },
    scarab: { char: '🪲', value: 25 },
    lotus: { char: '⚘', value: 20 }
  },
  fonts: {
    title: 'Georgia',
    body: 'Arial'
  },
  ui: {
    reelWidth: 120,
    reelHeight: 120,
    padding: 20,
    cornerRadius: 15
  }
};

window.drawGlowingText = (text, x, y, color, size, glow = 20) => {
  push();
  textSize(size);
  textAlign(CENTER, CENTER);
  
  // Glow effect
  drawingContext.shadowBlur = glow;
  drawingContext.shadowColor = color;
  fill(color);
  text(text, x, y);
  
  // Clear glow
  drawingContext.shadowBlur = 0;
  pop();
};

window.drawGlowingRect = (x, y, w, h, color, radius = 0, glow = 20) => {
  push();
  drawingContext.shadowBlur = glow;
  drawingContext.shadowColor = color;
  fill(THEME.darker);
  stroke(color);
  strokeWeight(2);
  rect(x, y, w, h, radius);
  drawingContext.shadowBlur = 0;
  pop();
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