console.log('Sketch loading...');

function setup() {
  console.log('Setup running...');
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  console.log('Canvas created:', windowWidth, 'x', windowHeight);
}

function windowResized() {
  console.log('Window resized...');
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  // Test circle
  fill(255);
  noStroke();
  circle(width/2, height/2, 100);
  
  // Test text
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Canvas Working!', width/2, height/2 - 100);
}

console.log('Sketch loaded!');