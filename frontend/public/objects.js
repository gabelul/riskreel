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

class SoundManager {
  constructor() {
    this.sounds = {};
    this.muted = false;
  }

  addSound(name, soundFile) {
    this.sounds[name] = soundFile;
  }

  play(name) {
    if (!this.muted && this.sounds[name]) {
      this.sounds[name].play();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
  }
}

function checkWinningLine(symbols) {
  // Check if all symbols are the same
  return symbols[0].current === symbols[1].current && 
         symbols[1].current === symbols[2].current;
}

class AchievementManager {
  constructor() {
    this.achievements = [
      { name: 'First Spin', description: 'Complete your first spin', unlocked: false },
      { name: 'Lucky Streak', description: 'Win 5 times in a row', unlocked: false },
      { name: 'High Roller', description: 'Reach 2000 credits', unlocked: false }
    ];
    this.panelOpen = false;
  }

  checkAchievements(stats) {
    if (stats.totalSpins > 0) {
      this.achievements[0].unlocked = true;
    }
    
    if (stats.wins >= 5) {
      this.achievements[1].unlocked = true;
    }
    
    if (stats.credits >= 2000) {
      this.achievements[2].unlocked = true;
    }
  }

  draw() {
    if (!this.panelOpen) return;

    fill(240);
    rect(width - 250, 50, 230, 300, 10);
    
    fill(50);
    textSize(18);
    textAlign(CENTER, TOP);
    text('Achievements', width - 135, 60);

    textAlign(LEFT, TOP);
    textSize(14);
    for (let i = 0; i < this.achievements.length; i++) {
      let achievement = this.achievements[i];
      fill(achievement.unlocked ? color(0, 200, 0) : color(150));
      text(`${achievement.name}: ${achievement.description}`, 
            width - 240, 100 + i * 40);
    }
  }

  checkButton(x, y) {
    if (x > width - 50 && x < width - 20 && y > 10 && y < 40) {
      this.panelOpen = !this.panelOpen;
      return true;
    }
    return false;
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
    this.soundManager = new SoundManager();
    this.achievements = new AchievementManager();
    this.setupSymbols();
  }

  setSounds(spinStart, spinStop, win) {
    this.soundManager.addSound('spin', spinStart);
    this.soundManager.addSound('stop', spinStop);
    this.soundManager.addSound('win', win);
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
    this.soundManager.play('spin');
    
    for (let symbol of this.symbols) {
      symbol.speed = random(15, 25);
      symbol.targetY = height * 0.4;
      symbol.current = random(symbol.symbols);
    }

    setTimeout(() => {
      this.spinning = false;
      this.soundManager.play('stop');
      this.checkWin();
    }, 2000);
  }

  checkWin() {
    const isWin = checkWinningLine(this.symbols);
    const winAmount = isWin ? this.calculateWinAmount() : 0;
    
    if (isWin) {
      this.soundManager.play('win');
    }
    
    this.stats.addSpin(isWin, winAmount);
    this.achievements.checkAchievements(this.stats);
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

    // Add mute button
    fill(this.soundManager.muted ? 'red' : 'green');
    circle(width - 30, 30, 30);
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(this.soundManager.muted ? '🔇' : '🔊', width - 30, 30);

    // Add achievements button
    fill(150);
    circle(width - 35, 20, 20);
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('🏆', width - 35, 20);

    // Draw achievements
    this.achievements.draw();

    // Responsible gaming message
    fill(150);
    textSize(16);
    text('Please play responsibly. Set time and money limits.',
         width/2, height * 0.95);
  }

  checkButton(x, y) {
    // Check spin button
    if (x > this.spinButton.x - this.spinButton.w/2 &&
        x < this.spinButton.x + this.spinButton.w/2 &&
        y > this.spinButton.y - this.spinButton.h/2 &&
        y < this.spinButton.y + this.spinButton.h/2) {
      return 'spin';
    }
    
    // Check mute button
    if (dist(x, y, width - 30, 30) < 15) {
      return 'mute';
    }

    // Check achievement panel button
    if (this.achievements.checkButton(x, y)) {
      return 'achievements';
    }
    
    return null;
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