window.THEME = {
  colors: {
    gold: '#FFD700',        // Primary gold
    sandLight: '#FFF3E0',   // Light text
    sandDark: '#A67C52',    // Dark accents
    nileBlue: '#0D47A1',    // Deep blue
    pyramidStone: '#8D6E63',// Stone color
    nightSky: '#1A237E',    // Background
    accent: '#FF5722'       // Highlight color
  },
  symbols: [
    { char: '☥', name: 'ankh', value: 100, color: '#FFD700' },
    { char: '👁', name: 'eye', value: 75, color: '#FF5722' },
    { char: '🔺', name: 'pyramid', value: 50, color: '#0D47A1' },
    { char: '🪲', name: 'scarab', value: 25, color: '#4CAF50' },
    { char: '⚘', name: 'lotus', value: 10, color: '#9C27B0' }
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

// Utility functions
window.createGlow = (color, strength) => {
  drawingContext.shadowBlur = strength;
  drawingContext.shadowColor = color;
};

window.clearGlow = () => {
  drawingContext.shadowBlur = 0;
};

window.drawGlowingText = (text, x, y, color, size, glow = THEME.ui.glowStrength) => {
  push();
  createGlow(color, glow);
  fill(color);
  noStroke();
  textSize(size);
  textAlign(CENTER, CENTER);
  text(text, x, y);
  clearGlow();
  pop();
};