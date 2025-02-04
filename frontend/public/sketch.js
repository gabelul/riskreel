let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  // Test text
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Canvas Working!', width/2, height/2);
}