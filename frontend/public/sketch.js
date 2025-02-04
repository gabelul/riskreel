let slotMachine;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  slotMachine = new SlotMachine();
}

function draw() {
  // Gradient background
  let gradient = drawingContext.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, THEME.colors.nightSky);
  gradient.addColorStop(1, color(THEME.colors.nightSky).levels[0] * 0.5);
  drawingContext.fillStyle = gradient;
  rect(0, 0, width, height);

  // Pyramid silhouette
  fill(THEME.colors.pyramidStone);
  noStroke();
  triangle(
    width/2, height * 0.2,
    width * 0.2, height * 0.8,
    width * 0.8, height * 0.8
  );

  // Stars
  for (let i = 0; i < 50; i++) {
    let x = noise(i, frameCount * 0.001) * width;
    let y = noise(i + 100, frameCount * 0.001) * height * 0.5;
    stroke(THEME.colors.sandLight);
    point(x, y);
  }

  slotMachine.draw();
}

function mousePressed() {
  slotMachine.handleClick(mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  slotMachine.resize();
}