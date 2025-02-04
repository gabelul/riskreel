let slotMachine;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  slotMachine = new SlotMachine();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  slotMachine.setupReels();
}

function draw() {
  // Gradient background
  let gradient = drawingContext.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, THEME.colors.background);
  gradient.addColorStop(1, THEME.colors.dark);
  drawingContext.fillStyle = gradient;
  rect(0, 0, width, height);
  
  // Draw pyramid silhouette
  fill(0, 20);
  noStroke();
  triangle(
    width/2, height * 0.1,
    width * 0.2, height * 0.9,
    width * 0.8, height * 0.9
  );
  
  slotMachine.draw();
}

function mousePressed() {
  if (slotMachine.checkSpin(mouseX, mouseY)) {
    slotMachine.spin();
  }
}