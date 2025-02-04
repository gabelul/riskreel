let slotMachine;
let playTime = 0;
let lastUpdate = 0;
let spinSound, stopSound, winSound;

function preload() {
  // Load sound files
  soundFormats('mp3');
  spinSound = loadSound('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');
  stopSound = loadSound('https://assets.mixkit.co/active_storage/sfx/2004/2004-preview.mp3');
  winSound = loadSound('https://assets.mixkit.co/active_storage/sfx/2005/2005-preview.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  slotMachine = new SlotMachine();
  slotMachine.setSounds(spinSound, stopSound, winSound);
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
  
  // Draw session timer and win rate
  fill(100);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Session time: ${formatTime(playTime)}`, 20, 20);
  text(`Win Rate: ${calculateWinProbability(slotMachine.stats.wins, slotMachine.stats.totalSpins)}%`, 20, 45);
}

function mousePressed() {
  const action = slotMachine.checkButton(mouseX, mouseY);
  
  if (action === 'spin') {
    slotMachine.spin();
  } else if (action === 'mute') {
    slotMachine.soundManager.toggleMute();
  }
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function calculateWinProbability(wins, totalSpins) {
  if (totalSpins === 0) return 0;
  return ((wins / totalSpins) * 100).toFixed(2);
}