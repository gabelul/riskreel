let slotMachine;
let playTime = 0;
let lastUpdate = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  slotMachine = new SlotMachine();
  lastUpdate = millis();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  slotMachine.setupSymbols();
}

function draw() {
  background(245);
  
  // Update play time
  if (millis() - lastUpdate >= 1000) {
    playTime++;
    lastUpdate = millis();
  }
  
  slotMachine.draw();
  
  // Draw session timer
  fill(100);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Session time: ${formatTime(playTime)}`, 20, 20);
}

function mousePressed() {
  if (slotMachine.checkButton(mouseX, mouseY)) {
    slotMachine.spin();
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}