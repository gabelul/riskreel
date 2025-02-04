console.log('Loading sketch...');

new p5(function(p) {
  let slotMachine;

  p.preload = function() {
    // Sound loading will happen in SlotMachine constructor
  };

  p.setup = function() {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('sketch-container');
    
    // Initialize theme with p5 instance
    window.initTheme(p);
    
    // Create slot machine with sound support
    slotMachine = new SlotMachine(p);
  };

  p.draw = function() {
    // Background
    p.background(25, 35, 60);

    // Draw stars
    for (let i = 0; i < 50; i++) {
      let x = p.noise(i, p.frameCount * 0.001) * p.width;
      let y = p.noise(i + 100, p.frameCount * 0.001) * p.height * 0.5;
      let brightness = p.noise(i + 200, p.frameCount * 0.02) * 255;
      p.stroke(brightness);
      p.strokeWeight(2);
      p.point(x, y);
    }
    
    // Draw pyramid silhouette
    p.fill(141, 110, 99, 100);
    p.noStroke();
    p.triangle(
      p.width/2, p.height * 0.2,
      p.width * 0.2, p.height * 0.8,
      p.width * 0.8, p.height * 0.8
    );

    slotMachine.draw();
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    if (slotMachine) {
      slotMachine.resize();
    }
  };

  p.mousePressed = function() {
    if (slotMachine) {
      slotMachine.handleClick(p.mouseX, p.mouseY);
    }
  };
});

console.log('Sketch loaded');