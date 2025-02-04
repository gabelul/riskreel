// Any objects types go here

class Symbol {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.symbols = ['🍎', '🍋', '🍇', '⭐', '🔔'];
    this.current = random(this.symbols);
    this.targetY = y;
    this.speed = 0;
  }

  update() {
    this.y += this.speed;
    this.speed *= 0.95; // Smooth deceleration
    
    if (abs(this.y - this.targetY) < 1) {
      this.y = this.targetY;
      this.speed = 0;
    }
  }

  draw() {
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text(this.current, this.x, this.y);
  }
}

class StatsTracker {
  constructor() {
    this.wins = 0;
    this.losses = 0;
    this.totalSpins = 0;
    this.credits = 1000;
    this.lastWin = 0;
    this.showWinAnimation = false;
    this.winAnimationTimer = 0;
  }

  addSpin(isWin, amount) {
    this.totalSpins++;
    if (isWin) {
      this.wins++;
      this.credits += amount;
      this.lastWin = amount;
      this.showWinAnimation = true;
      this.winAnimationTimer = 60; // Animation frames
    } else {
      this.losses++;
      this.credits -= 10; // Base bet
    }
  }

  draw() {
    // Stats Panel
    fill(255);
    stroke(200);
    rect(20, height - 120, 200, 100, 10);
    
    noStroke();
    fill(50);
    textAlign(LEFT, TOP);
    textSize(14);
    text(`Credits: ${this.credits}`, 30, height - 110);
    text(`Total Spins: ${this.totalSpins}`, 30, height - 90);
    text(`Wins: ${this.wins}`, 30, height - 70);
    text(`Losses: ${this.losses}`, 30, height - 50);
    
    // Win Animation
    if (this.showWinAnimation) {
      this.winAnimationTimer--;
      if (this.winAnimationTimer <= 0) {
        this.showWinAnimation = false;
      }
      
      push();
      textAlign(CENTER, CENTER);
      textSize(32);
      fill(255, 215, 0, this.winAnimationTimer * 4);
      text(`WIN! +${this.lastWin}`, width/2, height/2 - 100);
      pop();
    }
  }
}

class SlotMachine {
  constructor() {
    this.reels = 3;
    this.symbols = [];
    this.spinning = false;
    this.spinButton = {
      x: width/2,
      y: height * 0.8,
      w: 150,
      h: 50
    };
    this.stats = new StatsTracker();
    this.betAmount = 10;
    this.setupSymbols();
  }

  setupSymbols() {
    for (let i = 0; i < this.reels; i++) {
      this.symbols[i] = new Symbol(
        width * (0.3 + i * 0.2),
        height * 0.4,
        60
      );
    }
  }

  spin() {
    if (this.spinning || this.stats.credits < this.betAmount) return;
    
    this.spinning = true;
    
    for (let symbol of this.symbols) {
      symbol.speed = random(15, 25);
      symbol.targetY = height * 0.4;
      symbol.current = random(symbol.symbols);
    }

    setTimeout(() => {
      this.spinning = false;
      this.checkWin();
    }, 2000);
  }

  checkWin() {
    const isWin = this.checkWinningLine();
    const winAmount = isWin ? this.calculateWinAmount() : 0;
    this.stats.addSpin(isWin, winAmount);
  }

  checkWinningLine() {
    // Check if all symbols are the same
    return this.symbols[0].current === this.symbols[1].current && 
           this.symbols[1].current === this.symbols[2].current;
  }

  calculateWinAmount() {
    // Different symbols have different values
    const symbolValues = {
      '🔔': 50,
      '⭐': 40,
      '🍇': 30,
      '🍎': 20,
      '🍋': 20
    };
    return symbolValues[this.symbols[0].current] || 20;
  }

  draw() {
    // Draw frame
    stroke(200);
    noFill();
    rect(width * 0.2, height * 0.2, width * 0.6, height * 0.4, 20);
    
    // Draw symbols
    for (let symbol of this.symbols) {
      symbol.update();
      symbol.draw();
    }

    // Draw spin button
    fill(100, 149, 237);
    noStroke();
    rect(this.spinButton.x - this.spinButton.w/2,
         this.spinButton.y - this.spinButton.h/2,
         this.spinButton.w,
         this.spinButton.h,
         25);
    
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text('SPIN', this.spinButton.x, this.spinButton.y);

    // Add bet amount display
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(`Bet: ${this.betAmount}`, width/2, height * 0.7);
    
    // Draw stats
    this.stats.draw();

    // Responsible gaming message
    fill(150);
    textSize(16);
    text('Please play responsibly. Set time and money limits.',
         width/2, height * 0.95);
  }

  checkButton(x, y) {
    return (x > this.spinButton.x - this.spinButton.w/2 &&
            x < this.spinButton.x + this.spinButton.w/2 &&
            y > this.spinButton.y - this.spinButton.h/2 &&
            y < this.spinButton.y + this.spinButton.h/2);
  }
}

class Ball {
  constructor(x, y, size = 30) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = 3;
    this.vy = 2;
  }

  update() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off walls
    if (this.x + this.size / 2 > width || this.x - this.size / 2 < 0)
      this.vx *= -1;
    if (this.y + this.size / 2 > height || this.y - this.size / 2 < 0)
      this.vy *= -1;
  }

  draw() {
    fill(255);
    noStroke();
    circle(this.x, this.y, this.size);
  }
}