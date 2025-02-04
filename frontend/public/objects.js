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
    if (this.spinning) return;
    this.spinning = true;
    
    for (let symbol of this.symbols) {
      symbol.speed = random(15, 25);
      symbol.targetY = height * 0.4;
      symbol.current = random(symbol.symbols);
    }

    // Auto-stop after 2 seconds
    setTimeout(() => {
      this.spinning = false;
    }, 2000);
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