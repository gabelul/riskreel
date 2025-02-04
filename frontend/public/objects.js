console.log('Loading objects...');

window.Reel = class Reel {
  constructor(p, x, y) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.targetY = y;
    this.symbol = THEME.symbols[0];
    this.rotation = 0;
    this.speed = 0;
    this.scale = 1;
  }

  draw() {
    const p = this.p;
    p.push();
    p.translate(this.x + THEME.ui.reelWidth/2, this.y + THEME.ui.reelHeight/2);
    p.rotate(this.rotation);
    p.scale(this.scale);

    // Reel background
    p.drawingContext.shadowBlur = THEME.ui.glowStrength;
    p.drawingContext.shadowColor = THEME.colors.gold.toString();
    p.fill(25, 35, 60);
    p.stroke(255, 215, 0);
    p.strokeWeight(2);
    p.rect(-THEME.ui.reelWidth/2, -THEME.ui.reelHeight/2, 
           THEME.ui.reelWidth, THEME.ui.reelHeight, 
           THEME.ui.cornerRadius);

    // Symbol
    p.fill(255, 215, 0);
    p.noStroke();
    p.textSize(THEME.ui.reelHeight * 0.6);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(this.symbol.char, 0, 0);

    p.drawingContext.shadowBlur = 0;
    p.pop();
  }

  spin() {
    this.speed = this.p.random(15, 25);
    this.symbol = THEME.symbols[Math.floor(this.p.random(THEME.symbols.length))];
    this.scale = 0.95;
  }

  update() {
    if (this.speed > 0) {
      this.rotation += this.speed * 0.1;
      this.speed *= 0.9;
      this.scale = this.p.lerp(this.scale, 1, 0.1);

      if (this.speed < 0.1) {
        this.speed = 0;
        this.rotation = 0;
        this.scale = 1;
      }
    }
  }
};

window.SlotMachine = class SlotMachine {
  constructor(p) {
    this.p = p;
    this.reels = [];
    this.spinning = false;
    this.init();
  }

  init() {
    const centerX = this.p.width/2 - (THEME.ui.reelWidth + THEME.ui.spacing);
    const centerY = this.p.height/2 - THEME.ui.reelHeight/2;
    
    this.reels = [];
    for (let i = 0; i < 3; i++) {
      const x = centerX + (i * (THEME.ui.reelWidth + THEME.ui.spacing));
      this.reels.push(new Reel(this.p, x, centerY));
    }
  }

  draw() {
    const p = this.p;
    
    // Machine frame
    p.drawingContext.shadowBlur = THEME.ui.glowStrength * 1.5;
    p.drawingContext.shadowColor = THEME.colors.gold.toString();
    p.fill(25, 35, 60);
    p.stroke(255, 215, 0);
    p.strokeWeight(3);
    p.rect(p.width/2 - (THEME.ui.reelWidth * 2), 
           p.height/2 - THEME.ui.reelHeight * 1.2,
           THEME.ui.reelWidth * 4,
           THEME.ui.reelHeight * 2.4,
           THEME.ui.cornerRadius * 2);

    // Title
    p.fill(255, 215, 0);
    p.noStroke();
    p.textSize(48);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("Egyptian Fortune", p.width/2, p.height/2 - THEME.ui.reelHeight * 1.5);

    // Update and draw reels
    for (let reel of this.reels) {
      reel.update();
      reel.draw();
    }

    this.drawSpinButton();
  }

  drawSpinButton() {
    const p = this.p;
    const buttonY = p.height/2 + THEME.ui.reelHeight * 0.8;
    
    p.drawingContext.shadowBlur = THEME.ui.glowStrength;
    p.drawingContext.shadowColor = this.spinning ? 
      THEME.colors.sandDark.toString() : 
      THEME.colors.accent.toString();
    
    p.fill(this.spinning ? THEME.colors.nightSky : THEME.colors.accent);
    p.stroke(255, 215, 0);
    p.rect(p.width/2 - 60, buttonY, 120, 40, 20);
    
    p.fill(255, 243, 224);
    p.noStroke();
    p.textSize(20);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(this.spinning ? "SPINNING..." : "SPIN", p.width/2, buttonY + 20);
  }

  handleClick(mx, my) {
    const buttonY = this.p.height/2 + THEME.ui.reelHeight * 0.8;
    if (mx > this.p.width/2 - 60 && mx < this.p.width/2 + 60 &&
        my > buttonY && my < buttonY + 40) {
      this.spin();
    }
  }

  spin() {
    if (this.spinning) return;
    
    this.spinning = true;
    for (let reel of this.reels) {
      reel.spin();
    }

    setTimeout(() => {
      this.spinning = false;
    }, THEME.ui.spinDuration);
  }

  resize() {
    this.init();
  }
};

console.log('Objects loaded');