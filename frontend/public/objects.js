console.log('Objects loaded');

window.GameObject = class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Symbol {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.targetY = y;
    this.symbol = random(THEME.symbols);
    this.rotation = 0;
    this.scale = 1;
    this.speed = 0;
  }

  update() {
    if (this.speed > 0) {
      this.y += this.speed;
      this.rotation += this.speed * 0.02;
      this.speed *= 0.95;

      if (abs(this.y - this.targetY) < 1) {
        this.y = this.targetY;
        this.speed = 0;
        this.rotation = 0;
      }
    }
  }

  draw() {
    push();
    translate(this.x + THEME.ui.reelWidth/2, this.y + THEME.ui.reelHeight/2);
    rotate(this.rotation);
    scale(this.scale);

    // Symbol background
    createGlow(drawingContext, this.symbol.color, THEME.ui.glowStrength);
    fill(THEME.colors.darker);
    stroke(this.symbol.color);
    strokeWeight(2);
    rect(-THEME.ui.reelWidth/2, -THEME.ui.reelHeight/2, 
         THEME.ui.reelWidth, THEME.ui.reelHeight, 
         THEME.ui.radius);

    // Symbol
    noStroke();
    fill(this.symbol.color);
    textSize(THEME.ui.reelHeight * 0.6);
    textAlign(CENTER, CENTER);
    text(this.symbol.char, 0, 0);

    clearGlow(drawingContext);
    pop();
  }
}

class SlotMachine {
  constructor() {
    this.symbols = [];
    this.spinning = false;
    this.setupSymbols();
  }

  setupSymbols() {
    this.symbols = [];
    for (let i = 0; i < 3; i++) {
      let x = width/2 + (i - 1) * (THEME.ui.reelWidth + THEME.ui.padding);
      let y = height/2 - THEME.ui.reelHeight/2;
      this.symbols.push(new Symbol(x, y));
    }
  }

  spin() {
    if (this.spinning) return;
    
    this.spinning = true;
    for (let symbol of this.symbols) {
      symbol.speed = random(15, 25);
      symbol.symbol = random(THEME.symbols);
    }

    setTimeout(() => {
      this.spinning = false;
    }, THEME.ui.spinDuration);
  }

  draw() {
    // Background frame
    createGlow(drawingContext, THEME.colors.primary, THEME.ui.glowStrength);
    fill(THEME.colors.darker);
    stroke(THEME.colors.primary);
    strokeWeight(3);
    rect(width/2 - (THEME.ui.reelWidth * 2), 
         height/2 - THEME.ui.reelHeight * 1.2,
         THEME.ui.reelWidth * 4,
         THEME.ui.reelHeight * 2.4,
         THEME.ui.radius * 2);
    clearGlow(drawingContext);

    // Title
    fill(THEME.colors.primary);
    textSize(48);
    textAlign(CENTER, CENTER);
    createGlow(drawingContext, THEME.colors.primary, THEME.ui.glowStrength);
    text("Egyptian Fortune", width/2, height/2 - THEME.ui.reelHeight * 1.5);
    clearGlow(drawingContext);

    // Update and draw symbols
    for (let symbol of this.symbols) {
      symbol.update();
      symbol.draw();
    }

    // Spin button
    let buttonY = height/2 + THEME.ui.reelHeight * 0.8;
    createGlow(drawingContext, this.spinning ? THEME.colors.dark : THEME.colors.accent, 
               THEME.ui.glowStrength);
    fill(this.spinning ? THEME.colors.darker : THEME.colors.accent);
    stroke(THEME.colors.primary);
    rect(width/2 - 75, buttonY, 150, 50, 25);
    
    fill(THEME.colors.light);
    noStroke();
    textSize(24);
    text(this.spinning ? "SPINNING..." : "SPIN", width/2, buttonY + 25);
    clearGlow(drawingContext);
  }

  checkSpin(mx, my) {
    let buttonY = height/2 + THEME.ui.reelHeight * 0.8;
    return (mx > width/2 - 75 && mx < width/2 + 75 &&
            my > buttonY && my < buttonY + 50);
  }
}