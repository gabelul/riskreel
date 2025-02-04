// Any helper functions go here

function checkWinningLine(symbols) {
  const firstSymbol = symbols[0].current;
  return symbols.every(s => s.current === firstSymbol);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function calculateWinProbability(wins, totalSpins) {
  if (totalSpins === 0) return 0;
  return (wins / totalSpins * 100).toFixed(1);
}

function formatCredits(amount) {
  return amount.toLocaleString();
}

class SoundManager {
  constructor() {
    this.sounds = {};
    this.muted = false;
  }

  addSound(name, sound) {
    this.sounds[name] = sound;
    this.sounds[name].setVolume(0.5); // Set default volume to 50%
  }

  play(name) {
    if (!this.muted && this.sounds[name]) {
      this.sounds[name].play();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }
}