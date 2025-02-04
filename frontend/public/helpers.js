window.THEME = {
  colors: {
    gold: color(255, 215, 0),        // Bright gold
    sandLight: color(255, 243, 224),  // Light text
    sandDark: color(166, 124, 82),    // Dark accents
    nileBlue: color(13, 71, 161),     // Deep blue
    pyramidStone: color(141, 110, 99),// Stone color
    nightSky: color(25, 35, 60),      // Background
    accent: color(255, 87, 34)        // Highlight color
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

window.drawGlowingText = (text, x, y, fillColor, size, glow = THEME.ui.glowStrength) => {
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