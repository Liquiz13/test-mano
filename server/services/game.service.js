const SYMBOLS = ['C', 'L', 'O', 'W'];
const PAYOUTS = { C: 10, L: 20, O: 30, W: 40 };

function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function rollSlots() {
  return [randomSymbol(), randomSymbol(), randomSymbol()];
}

function isWinning(roll) {
  return roll[0] === roll[1] && roll[1] === roll[2];
}

function shouldReroll(credits) {
  if (credits >= 60) return Math.random() < 0.6;
  if (credits >= 40) return Math.random() < 0.3;
  return false;
}

module.exports = { rollSlots, isWinning, shouldReroll, PAYOUTS };
