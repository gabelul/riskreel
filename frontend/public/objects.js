console.log('Loading objects...');

class Symbol {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.targetY = y;
    this.symbol = THEME.symbolList[Math.floor(Math.random() * THEME.symbolList.length)];
    this.rotation = 0;
    this.speed = 0;
  }

  update() {
    if (this.speed > 0) {
      this.y += this.speed;
      this.rotation += this.speed * 0.02;
      this.speed *= 0.95;

      if (Math.abs(this.y - this.targetY) < 1) {
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

    // Symbol background
    fill(THEME.colors.darker);
    stroke(THEME.colors.primary);
    strokeWeight(2);
    rect(-THEME.ui.reelWidth/2, -THEME.ui.reelHeight/2, 
         THEME.ui.reelWidth, THEME.ui.reelHeight, 
         THEME.ui.radius);

    // Symbol
    noStroke();
    fill(THEME.colors.primary);
    textSize(THEME.ui.reelHeight * 0.6);
    textAlign(CENTER, CENTER);
    text(this.symbol, 0, 0);

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
    for (let i = 0; i < this.symbols.length; i++) {
      this.symbols[i].speed = random(15, 25);
      this.symbols[i].symbol = THEME.symbolList[Math.floor(Math.random() * THEME.symbolList.length)];
    }

    setTimeout(() => {
      this.spinning = false;
    }, 2000);
  }

  draw() {
    // Background frame
    fill(THEME.colors.darker);
    stroke(THEME.colors.primary);
    strokeWeight(3);
    rect(width/2 - (THEME.ui.reelWidth * 2), 
         height/2 - THEME.ui.reelHeight * 1.2,
         THEME.ui.reelWidth * 4,
         THEME.ui.reelHeight * 2.4,
         THEME.ui.radius * 2);

    // Title
    fill(THEME.colors.primary);
    noStroke();
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Egyptian Fortune", width/2, height/2 - THEME.ui.reelHeight * 1.5);

    // Draw symbols
    for (let i = 0; i < this.symbols.length; i++) {
      this.symbols[i].update();
      this.symbols[i].draw();
    }

    // Spin button
    let buttonY = height/2 + THEME.ui.reelHeight * 0.8;
    fill(this.spinning ? THEME.colors.darker : THEME.colors.accent);
    stroke(THEME.colors.primary);
    rect(width/2 - 75, buttonY, 150, 50, 25);
    
    fill(THEME.colors.light);
    noStroke();
    textSize(24);
    textAlign(CENTER, CENTER);
    text(this.spinning ? "SPINNING..." : "SPIN", width/2, buttonY + 25);
  }

  checkSpin(mx, my) {
    let buttonY = height/2 + THEME.ui.reelHeight * 0.8;
    return (mx > width/2 - 75 && mx < width/2 + 75 &&
            my > buttonY && my < buttonY + 50);
  }
}

console.log('Objects loaded');