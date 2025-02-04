console.log('Objects loaded');

window.GameObject = class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class SlotSymbol {
  constructor(x, y, symbol) {
    this.x = x;
    this.y = y;
    this.targetY = y;
    this.symbol = symbol;
    this.rotation = 0;
    this.speed = 0;
    this.size = THEME.ui.reelWidth;
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
    translate(this.x + this.size/2, this.y + this.size/2);
    rotate(this.rotation);
    
    // Symbol background
    drawGlowingRect(-this.size/2, -this.size/2, 
                    this.size, this.size, 
                    THEME.colors.primary, 
                    THEME.ui.cornerRadius);
    
    // Symbol
    drawGlowingText(
      this.symbol.char,
      0, 0,
      THEME.colors.primary,
      this.size * 0.6
    );
    
    pop();
  }
}

class SlotMachine {
  constructor() {
    this.symbols = Object.values(THEME.symbols);
    this.reels = [];
    this.spinning = false;
    this.setupReels();
  }

  setupReels() {
    for (let i = 0; i < 3; i++) {
      let x = width/2 + (i - 1) * (THEME.ui.reelWidth + THEME.ui.padding);
      let y = height/2 - THEME.ui.reelHeight/2;
      this.reels[i] = new SlotSymbol(
        x, y,
        random(this.symbols)
      );
    }
  }

  spin() {
    if (this.spinning) return;
    this.spinning = true;
    
    for (let reel of this.reels) {
      reel.speed = random(15, 25);
      reel.symbol = random(this.symbols);
    }
    
    setTimeout(() => {
      this.spinning = false;
    }, 2000);
  }

  draw() {
    // Background frame
    drawGlowingRect(
      width/2 - (THEME.ui.reelWidth * 2),
      height/2 - THEME.ui.reelHeight,
      THEME.ui.reelWidth * 4,
      THEME.ui.reelHeight * 2,
      THEME.colors.primary,
      THEME.ui.cornerRadius * 2
    );
    
    // Title
    drawGlowingText(
      "Egyptian Fortune",
      width/2,
      height/2 - THEME.ui.reelHeight * 1.2,
      THEME.colors.primary,
      48
    );
    
    // Update and draw reels
    for (let reel of this.reels) {
      reel.update();
      reel.draw();
    }
    
    // Spin button
    let buttonY = height/2 + THEME.ui.reelHeight * 1.2;
    drawGlowingRect(
      width/2 - 75,
      buttonY,
      150,
      50,
      this.spinning ? THEME.colors.dark : THEME.colors.accent,
      25
    );
    
    drawGlowingText(
      this.spinning ? "SPINNING..." : "SPIN",
      width/2,
      buttonY + 25,
      THEME.colors.light,
      24
    );
  }

  checkSpin(mx, my) {
    let buttonY = height/2 + THEME.ui.reelHeight * 1.2;
    return (
      mx > width/2 - 75 &&
      mx < width/2 + 75 &&
      my > buttonY &&
      my < buttonY + 50
    );
  }
}