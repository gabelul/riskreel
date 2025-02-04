console.log('Loading sketch...');

let slotMachine;

function setup() {
  console.log('Setup starting...');
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  
  // Initialize after canvas creation
  slotMachine = new SlotMachine();
  console.log('Setup complete');
}

function draw() {
  background(0);
  
  if (slotMachine) {
    slotMachine.draw();
  }
}

function mousePressed() {
  if (slotMachine) {
    slotMachine.handleClick(mouseX, mouseY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (slotMachine) {
    slotMachine.resize();
  }
}

console.log('Sketch loaded');