window.THEME = {
  colors: {
    primary: '#F4D03F',      // Egyptian Gold
    secondary: '#2980B9',    // Nile Blue
    accent: '#E67E22',       // Desert Orange
    dark: '#34495E',         // Night Sky
    darker: '#1C2833',       // Temple Dark
    light: '#ECF0F1',        // Sand Light
  },
  symbols: [
    { char: '☥', name: 'ankh', value: 50, color: '#F4D03F' },
    { char: '👁', name: 'eye', value: 40, color: '#E67E22' },
    { char: '🔺', name: 'pyramid', value: 30, color: '#2980B9' },
    { char: '🪲', name: 'scarab', value: 25, color: '#27AE60' },
    { char: '⚘', name: 'lotus', value: 20, color: '#8E44AD' }
  ],
  ui: {
    reelWidth: 120,
    reelHeight: 120,
    padding: 20,
    radius: 15,
    spinDuration: 2000,
    glowStrength: 20
  }
};

// Utility functions for visual effects
window.createGlow = (ctx, color, strength) => {
  ctx.shadowBlur = strength;
  ctx.shadowColor = color;
};

window.clearGlow = (ctx) => {
  ctx.shadowBlur = 0;
};