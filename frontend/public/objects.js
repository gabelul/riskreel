console.log('Loading objects...');

class Reel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.targetY = y;
    this.symbol = THEME.symbols[0];
    this.rotation = 0;
    this.speed = 0;
    this.scale = 1;
  }

  draw() {
    push();
    translate(this.x + THEME.ui.reelWidth/2, this.y + THEME.ui.reelHeight/2);
    rotate(this.rotation);
    scale(this.scale);

    // Reel background with glow
    createGlow(THEME.colors.gold, THEME.ui.glowStrength);
    fill(THEME.colors.nightSky);
    stroke(THEME.colors.gold);
    strokeWeight(2);
    rect(-THEME.ui.reelWidth/2, -THEME.ui.reelHeight/2, 
         THEME.ui.reelWidth, THEME.ui.reelHeight, 
         THEME.ui.cornerRadius);

    // Symbol with glow
    createGlow(this.symbol.color, THEME.ui.glowStrength);
    fill(this.symbol.color);
    noStroke();
    textSize(THEME.ui.reelHeight * 0.6);
    textAlign(CENTER, CENTER);
    text(this.symbol.char, 0, 0);

    clearGlow();
    pop();
  }

  spin() {
    this.speed = random(15, 25);
    this.symbol = random(THEME.symbols);
    this.scale = 0.95;
  }

  update() {
    if (this.speed > 0) {
      this.rotation += this.speed * 0.1;
      this.speed *= 0.9;
      this.scale = lerp(this.scale, 1, 0.1);

      if (this.speed < 0.1) {
        this.speed = 0;
        this.rotation = 0;
        this.scale = 1;
      }
    }
  }
}

class SlotMachine {
  constructor() {
    this.reels = [];
    this.spinning = false;
    this.init();
  }

  init() {
    const centerX = width/2 - (THEME.ui.reelWidth + THEME.ui.spacing);
    const centerY = height/2 - THEME.ui.reelHeight/2;
    
    for (let i = 0; i < 3; i++) {
      const x = centerX + (i * (THEME.ui.reelWidth + THEME.ui.spacing));
      this.reels[i] = new Reel(x, centerY);
    }
  }

  draw() {
    // Machine frame
    createGlow(THEME.colors.gold, THEME.ui.glowStrength * 1.5);
    fill(THEME.colors.nightSky);
    stroke(THEME.colors.gold);
    strokeWeight(3);
    rect(width/2 - (THEME.ui.reelWidth * 2), 
         height/2 - THEME.ui.reelHeight * 1.2,
         THEME.ui.reelWidth * 4,
         THEME.ui.reelHeight * 2.4,
         THEME.ui.cornerRadius * 2);
    clearGlow();

    // Title
    drawGlowingText(
      "Egyptian Fortune",
      width/2,
      height/2 - THEME.ui.reelHeight * 1.5,
      THEME.colors.gold,
      48
    );

    // Update and draw reels
    for (let reel of this.reels) {
      reel.update();
      reel.draw();
    }

    // Spin button
    this.drawSpinButton();
  }

  drawSpinButton() {
    const buttonY = height/2 + THEME.ui.reelHeight * 0.8;
    
    // Button background with glow
    createGlow(this.spinning ? THEME.colors.sandDark : THEME.colors.accent, 
               THEME.ui.glowStrength);
    fill(this.spinning ? THEME.colors.nightSky : THEME.colors.accent);
    stroke(THEME.colors.gold);
    rect(width/2 - 60, buttonY, 120, 40, 20);
    clearGlow();

    // Button text
    drawGlowingText(
      this.spinning ? "SPINNING..." : "SPIN",
      width/2,
      buttonY + 20,
      THEME.colors.sandLight,
      20
    );
  }

  handleClick(mx, my) {
    const buttonY = height/2 + THEME.ui.reelHeight * 0.8;
    if (mx > width/2 - 60 && mx < width/2 + 60 &&
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
}

console.log('Objects loaded');