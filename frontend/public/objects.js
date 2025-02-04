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
    this.soundManager = new SoundManager(p);
    this.init();
    this.loadSounds();
  }

  loadSounds() {
    // Load sound effects
    this.soundManager.addSound('spin', 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');
    this.soundManager.addSound('stop', 'https://assets.mixkit.co/active_storage/sfx/2004/2004-preview.mp3');
    this.soundManager.addSound('win', 'https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3');
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
    this.drawMuteButton();
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

  drawMuteButton() {
    const p = this.p;
    const buttonSize = 40;
    const padding = 20;
    
    p.push();
    p.drawingContext.shadowBlur = THEME.ui.glowStrength;
    p.drawingContext.shadowColor = THEME.colors.gold.toString();
    
    // Button background
    p.fill(this.soundManager.muted ? THEME.colors.sandDark : THEME.colors.gold);
    p.stroke(THEME.colors.gold);
    p.circle(p.width - padding - buttonSize/2, 
            padding + buttonSize/2, 
            buttonSize);
    
    // Mute icon
    p.fill(THEME.colors.nightSky);
    p.noStroke();
    p.textSize(20);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(this.soundManager.muted ? '🔇' : '🔊', 
           p.width - padding - buttonSize/2,
           padding + buttonSize/2);
    
    p.pop();
  }

  handleClick(mx, my) {
    // Check mute button
    const buttonSize = 40;
    const padding = 20;
    const d = this.p.dist(mx, my, 
                         this.p.width - padding - buttonSize/2,
                         padding + buttonSize/2);
    
    if (d < buttonSize/2) {
      this.soundManager.toggleMute();
      return;
    }

    // Check spin button
    const buttonY = this.p.height/2 + THEME.ui.reelHeight * 0.8;
    if (mx > this.p.width/2 - 60 && mx < this.p.width/2 + 60 &&
        my > buttonY && my < buttonY + 40) {
      this.spin();
    }
  }

  spin() {
    if (this.spinning) return;
    
    this.spinning = true;
    this.soundManager.play('spin');
    
    for (let reel of this.reels) {
      reel.spin();
    }

    setTimeout(() => {
      this.spinning = false;
      this.soundManager.play('stop');
      this.checkWin();
    }, THEME.ui.spinDuration);
  }

  checkWin() {
    // Simple win check (all symbols match)
    const firstSymbol = this.reels[0].symbol.char;
    const isWin = this.reels.every(reel => reel.symbol.char === firstSymbol);
    
    if (isWin) {
      this.soundManager.play('win');
      // Add win animation here if desired
    }
  }

  resize() {
    this.init();
  }
};

console.log('Objects loaded');