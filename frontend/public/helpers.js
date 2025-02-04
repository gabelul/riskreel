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