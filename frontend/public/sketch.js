console.log('Sketch starting...');

let canvas;

function setup() {
  console.log('Setting up canvas...');
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  console.log('Canvas created:', width, 'x', height);
}

function draw() {
  background(0);
  
  // Test shape
  fill(255);
  noStroke();
  circle(width/2, height/2, 100);
  
  // Test text
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Test Circle', width/2, height/2 - 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

console.log('Sketch loaded');