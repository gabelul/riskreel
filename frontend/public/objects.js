class Reel {
  constructor(p, x, y) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.symbol = THEME.symbols[0];
    this.rotation = 0;
    this.spinning = false;
  }

  draw() {
    const p = this.p;
    
    // Draw reel background
    p.fill(THEME.colors.darkBlue);
    drawNeonRect(p, this.x, this.y, 
                THEME.layout.reelWidth, 
                THEME.layout.reelHeight,
                THEME.colors.gold);
    
    // Draw symbol
    drawNeonText(p, this.symbol.char,
                this.x + THEME.layout.reelWidth/2,
                this.y + THEME.layout.reelHeight/2,
                THEME.colors.gold,
                THEME.layout.reelWidth * 0.6);
  }

  spin() {
    this.spinning = true;
    this.symbol = THEME.symbols[Math.floor(Math.random() * THEME.symbols.length)];
  }
}

class SlotMachine {
  constructor(p) {
    this.p = p;
    this.reels = [];
    this.credits = 1000;
    this.currentBet = 20;
    this.spinning = false;
    this.soundManager = new SoundManager(p);
    this.winAmount = 0;
    this.winType = null;
    this.winAnimationFrame = 0;
    this.initReels();
    this.loadSounds();
  }

  loadSounds() {
    // Load sound effects
    this.soundManager.addSound('spin', 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');
    this.soundManager.addSound('stop', 'https://assets.mixkit.co/active_storage/sfx/2004/2004-preview.mp3');
    this.soundManager.addSound('win', 'https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3');
  }

  initReels() {
    const startX = this.p.width/2 - (THEME.layout.reelWidth * 1.5 + THEME.layout.reelSpacing);
    const startY = this.p.height/2 - THEME.layout.reelHeight/2;
    
    for (let i = 0; i < 3; i++) {
      this.reels.push(new Reel(
        this.p,
        startX + (THEME.layout.reelWidth + THEME.layout.reelSpacing) * i,
        startY
      ));
    }
  }

  draw() {
    const p = this.p;
    
    // Draw main frame
    this.drawFrame();
    
    // Draw title
    drawNeonText(p, "Egyptian Fortune",
                p.width/2, 80,
                THEME.colors.gold, 64,
                THEME.glow.strong);
    
    // Draw credits
    drawNeonText(p, `${this.credits} Credits`,
                p.width/2, 150,
                THEME.colors.neonGold, 36);
    
    // Draw reels
    this.reels.forEach(reel => reel.draw());
    
    // Draw spin button
    this.drawSpinButton();
    
    // Draw control panel
    this.drawControlPanel();

    // Draw mute button
    this.drawMuteButton();

    // Draw win animation if active
    if (this.winAnimationFrame > 0) {
      this.drawWinAnimation();
      this.winAnimationFrame--;
    }
  }

  drawFrame() {
    const p = this.p;
    const frameWidth = THEME.layout.reelWidth * 3 + THEME.layout.reelSpacing * 4;
    const frameHeight = THEME.layout.reelHeight + 100;
    
    // Main frame
    drawNeonRect(p,
                p.width/2 - frameWidth/2,
                p.height/2 - frameHeight/2,
                frameWidth, frameHeight,
                THEME.colors.gold,
                THEME.glow.strong);
  }

  drawSpinButton() {
    const p = this.p;
    const buttonY = p.height/2 + THEME.layout.reelHeight/2 + 40;
    
    // Button background
    p.fill(this.spinning ? THEME.colors.darkBlue : THEME.colors.orange);
    drawNeonRect(p,
                p.width/2 - 80,
                buttonY,
                160, 60,
                THEME.colors.gold);
    
    // Button text
    drawNeonText(p,
                this.spinning ? "SPINNING..." : "SPIN",
                p.width/2,
                buttonY + 30,
                THEME.colors.white,
                28);
  }

  drawControlPanel() {
    const p = this.p;
    const y = p.height - THEME.layout.controlHeight;
    
    // Panel background
    p.fill(THEME.colors.darkBlue);
    drawNeonRect(p, 0, y,
                p.width, THEME.layout.controlHeight,
                THEME.colors.gold);
    
    // Control buttons
    const buttons = ['INFO', 'LINES', 'BET', 'MAX BET'];
    const startX = p.width/2 - (buttons.length * THEME.layout.buttonWidth)/2;
    
    buttons.forEach((label, i) => {
      const x = startX + i * THEME.layout.buttonWidth;
      
      p.fill(THEME.colors.orange);
      drawNeonRect(p, x + 10, y + 30,
                  THEME.layout.buttonWidth - 20,
                  THEME.layout.buttonHeight,
                  THEME.colors.gold);
      
      drawNeonText(p, label,
                  x + THEME.layout.buttonWidth/2,
                  y + 60,
                  THEME.colors.white,
                  24);
    });
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

  drawWinAnimation() {
    const p = this.p;
    
    // Create glowing effect
    p.drawingContext.shadowBlur = 20;
    p.drawingContext.shadowColor = THEME.colors.gold.toString();
    
    // Win text
    let winText = '';
    switch(this.winType) {
      case 'jackpot':
        winText = 'JACKPOT!';
        break;
      case 'bigWin':
        winText = 'BIG WIN!';
        break;
      case 'mediumWin':
        winText = 'GREAT WIN!';
        break;
      case 'smallWin':
        winText = 'WIN!';
        break;
    }

    // Animate win text
    const bounce = Math.sin(this.winAnimationFrame * 0.1) * 10;
    drawNeonText(p, winText,
                p.width/2, p.height/2 - 150 + bounce,
                THEME.colors.gold, 48);
    drawNeonText(p, `${this.winAmount} Credits`,
                p.width/2, p.height/2 - 100 + bounce,
                THEME.colors.neonGold, 32);
    
    p.drawingContext.shadowBlur = 0;
  }

  spin() {
    if (this.spinning) return;
    
    this.spinning = true;
    this.soundManager.play('spin');
    this.credits -= this.currentBet;
    
    this.reels.forEach(reel => reel.spin());
    
    setTimeout(() => {
      this.spinning = false;
      this.soundManager.play('stop');
      this.checkWin();
    }, 2000);
  }

  checkWin() {
    // Count matching symbols
    const symbolCounts = {};
    let maxCount = 0;
    let winningSymbol = null;

    // Count occurrences of each symbol
    for (let reel of this.reels) {
      const symbol = reel.symbol;
      symbolCounts[symbol.char] = (symbolCounts[symbol.char] || 0) + 1;
      
      if (symbolCounts[symbol.char] > maxCount) {
        maxCount = symbolCounts[symbol.char];
        winningSymbol = symbol;
      }
    }

    // Determine win type based on matches
    this.winAmount = 0;
    this.winType = null;

    if (maxCount >= 2) {
      if (maxCount === 3) {
        this.winType = 'mediumWin';
        this.winAmount = this.currentBet * 5;
      } else if (maxCount === 2) {
        this.winType = 'smallWin';
        this.winAmount = this.currentBet * 2;
      }

      // Bonus for special symbols
      if (winningSymbol.isSpecial) {
        this.winAmount *= 2;
      }

      this.credits += this.winAmount;

      // Play appropriate win sound
      this.soundManager.playWinSound(this.winType);
      this.winAnimationFrame = 60; // 1 second at 60fps
    }
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

    const buttonY = this.p.height/2 + THEME.layout.reelHeight/2 + 40;
    
    if (mx > this.p.width/2 - 80 &&
        mx < this.p.width/2 + 80 &&
        my > buttonY &&
        my < buttonY + 60) {
      this.spin();
    }
  }
}