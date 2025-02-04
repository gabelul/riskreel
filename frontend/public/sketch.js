let slotMachine;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  
  // Initialize theme 
  window.initTheme(window);
  
  // Create slot machine with sound support
  slotMachine = new SlotMachine(window);
}

function draw() {
  // Dark background
  background(25, 35, 60);
  
  // Draw stars
  drawStars();
  
  // Draw pyramid silhouette
  drawPyramid();
  
  // Draw slot machine
  slotMachine.draw();
}

function drawStars() {
  for (let i = 0; i < 50; i++) {
    let x = noise(i, frameCount * 0.001) * width;
    let y = noise(i + 100, frameCount * 0.001) * height * 0.5;
    let brightness = noise(i + 200, frameCount * 0.02) * 255;
    stroke(brightness);
    strokeWeight(2);
    point(x, y);
  }
}

function drawPyramid() {
  fill(141, 110, 99, 100);
  noStroke();
  triangle(
    width/2, height * 0.2,
    width * 0.2, height * 0.8,
    width * 0.8, height * 0.8
  );
}

function mousePressed() {
  slotMachine.handleClick(mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  slotMachine.resize();
}

console.log('Sketch loaded');