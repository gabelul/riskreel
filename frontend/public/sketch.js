console.log('Loading sketch...');

let slotMachine;

function setup() {
  console.log('Setting up canvas...');
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  slotMachine = new SlotMachine();
  console.log('Setup complete');
}

function draw() {
  // Background
  background(THEME.colors.darker);

  // Background pyramid
  fill(0, 20);
  noStroke();
  triangle(width/2, height * 0.1,
           width * 0.2, height * 0.9,
           width * 0.8, height * 0.9);

  slotMachine.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (slotMachine) {
    slotMachine.setupSymbols();
  }
}

function mousePressed() {
  if (slotMachine && slotMachine.checkSpin(mouseX, mouseY)) {
    slotMachine.spin();
  }
}

console.log('Sketch loaded');