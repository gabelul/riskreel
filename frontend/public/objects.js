console.log('Loading objects...');

class Reel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentSymbol = '☥';
    this.isSpinning = false;
  }

  draw() {
    // Draw reel background
    fill(50);
    stroke(255, 215, 0);
    strokeWeight(2);
    rect(this.x, this.y, 100, 100, 10);

    // Draw symbol
    fill(255, 215, 0);
    noStroke();
    textSize(60);
    textAlign(CENTER, CENTER);
    text(this.currentSymbol, this.x + 50, this.y + 50);
  }

  spin() {
    this.isSpinning = true;
    // Simple symbol change
    const symbols = ['☥', '👁', '🔺', '🪲', '⚘'];
    this.currentSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  }
}

class SlotMachine {
  constructor() {
    this.reels = [];
    this.init();
  }

  init() {
    // Create three reels
    for (let i = 0; i < 3; i++) {
      const x = width/2 - 150 + (i * 120);
      const y = height/2 - 50;
      this.reels[i] = new Reel(x, y);
    }
  }

  draw() {
    // Draw title
    fill(255, 215, 0);
    textSize(32);
    textAlign(CENTER, TOP);
    text('Egyptian Slots', width/2, 50);

    // Draw reels
    for (let i = 0; i < this.reels.length; i++) {
      this.reels[i].draw();
    }

    // Draw spin button
    fill(255, 140, 0);
    stroke(255, 215, 0);
    rect(width/2 - 60, height/2 + 100, 120, 40, 20);
    
    fill(255);
    noStroke();
    textSize(20);
    textAlign(CENTER, CENTER);
    text('SPIN', width/2, height/2 + 120);
  }

  handleClick(mx, my) {
    // Check if spin button clicked
    if (mx > width/2 - 60 && mx < width/2 + 60 &&
        my > height/2 + 100 && my < height/2 + 140) {
      this.spin();
    }
  }

  spin() {
    for (let i = 0; i < this.reels.length; i++) {
      this.reels[i].spin();
    }
  }

  resize() {
    this.init();
  }
}

console.log('Objects loaded');