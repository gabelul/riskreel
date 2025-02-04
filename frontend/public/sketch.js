let slotMachine;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  slotMachine = new SlotMachine();
}

function draw() {
  // Solid background first
  background(25, 35, 60); // Dark blue base

  // Draw stars
  drawStars();
  
  // Draw pyramid silhouette
  fill(141, 110, 99, 100); // Pyramid color with transparency
  noStroke();
  triangle(
    width/2, height * 0.2,
    width * 0.2, height * 0.8,
    width * 0.8, height * 0.8
  );

  slotMachine.draw();
}

function drawStars() {
  // Draw twinkling stars
  for (let i = 0; i < 50; i++) {
    let x = noise(i, frameCount * 0.001) * width;
    let y = noise(i + 100, frameCount * 0.001) * height * 0.5;
    let brightness = noise(i + 200, frameCount * 0.02) * 255;
    stroke(brightness);
    strokeWeight(2);
    point(x, y);
  }
}

function mousePressed() {
  slotMachine.handleClick(mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  slotMachine.resize();
}