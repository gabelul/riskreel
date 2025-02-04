// Add the new ProgressionSystem class
class ProgressionSystem {
  constructor() {
    this.level = 1;
    this.experience = 0;
    this.experienceToNextLevel = 100;
    this.difficultyMultiplier = 1;
  }

  addExperience(amount) {
    this.experience += amount;
    
    // Check for level up
    if (this.experience >= this.experienceToNextLevel) {
      this.levelUp();
    }
  }

  levelUp() {
    this.level++;
    this.experience -= this.experienceToNextLevel;
    this.experienceToNextLevel = Math.round(this.experienceToNextLevel * 1.5);
    
    // Increase difficulty multiplier slightly
    this.difficultyMultiplier = 1 + (this.level * 0.1);
  }

  draw() {
    // Draw level and experience bar
    fill(200);
    rect(20, 20, 200, 30, 10);
    
    // Experience progress
    fill(50, 200, 50);
    let progressWidth = map(this.experience, 0, this.experienceToNextLevel, 0, 200);
    rect(20, 20, progressWidth, 30, 10);
    
    // Level text
    fill(50);
    textSize(16);
    textAlign(LEFT, TOP);
    text(`Level ${this.level}`, 25, 25);
    
    // Experience text
    textAlign(RIGHT, TOP);
    text(`${this.experience}/${this.experienceToNextLevel}`, 215, 25);
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
    this.setupSymbols();
    this.achievementManager = new AchievementManager();
    this.playTime = 0;
    this.progression = new ProgressionSystem(); // Add progression system
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
    
    // Apply difficulty multiplier to bet
    const adjustedBet = Math.round(this.betAmount * this.progression.difficultyMultiplier);
    
    if (this.stats.credits < adjustedBet) return;
    
    this.spinning = true;
    this.soundManager.play('spin');
    
    // Add experience for spinning
    this.progression.addExperience(5);
    
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
    const baseWinAmount = isWin ? this.calculateWinAmount() : 0;
    
    // Apply difficulty multiplier to wins
    const adjustedWinAmount = Math.round(baseWinAmount * this.progression.difficultyMultiplier);
    
    if (isWin) {
      this.soundManager.play('win');
      // Add bonus experience for winning
      this.progression.addExperience(20);
    }
    
    this.stats.addSpin(isWin, adjustedWinAmount);
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
    // Increment play time
    this.playTime++;
    
    // Update achievements
    this.achievementManager.update(this.stats, this.playTime);

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

    // Add adjusted bet amount display
    const adjustedBet = Math.round(this.betAmount * this.progression.difficultyMultiplier);
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text(`Bet: ${adjustedBet} (${this.progression.difficultyMultiplier.toFixed(1)}x)`, width/2, height * 0.7);
    
    // Draw stats
    this.stats.draw();

    // Add mute button
    fill(this.soundManager.muted ? 'red' : 'green');
    circle(width - 30, 30, 30);
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(this.soundManager.muted ? '🔇' : '🔊', width - 30, 30);

    // Responsible gaming message
    fill(150);
    textSize(16);
    text('Please play responsibly. Set time and money limits.',
         width/2, height * 0.95);

    // Draw achievements
    this.achievementManager.draw();

    // Draw progression elements
    this.progression.draw();
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

    // Check achievement button
    if (this.achievementManager.checkButton(x, y)) {
      return 'achievements';
    }
    
    return null;
  }
}

// Rest of the existing code remains the same