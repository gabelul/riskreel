console.log('Sketch starting...');

function setup() {
  console.log('Setting up canvas...');
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  console.log('Canvas created');
}

function draw() {
  background(0);
  
  // Draw a simple test shape
  fill(255);
  noStroke();
  circle(width/2, height/2, 100);
  
  // Draw test text
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Test Circle', width/2, height/2 - 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

console.log('Sketch loaded');