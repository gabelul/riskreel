function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  // Test rectangle
  fill(255);
  noStroke();
  rect(width/2 - 50, height/2 - 50, 100, 100);
  
  // Test text
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Canvas Working!', width/2, height/2 - 100);
}