const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(session({ secret: 'casino_secret', resave: false, saveUninitialized: true }));

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

app.post('/api/start', (req, res) => {
  req.session.credits = 10;
  req.session.account = 0;
  res.json({ credits: req.session.credits });
});

app.post('/api/roll', (req, res) => {
  if (!req.session.credits || req.session.credits < 1) return res.status(403).json({ error: 'No credits' });

  req.session.credits -= 1;
  let roll = rollSlots();
  let win = isWinning(roll);

  if (win && shouldReroll(req.session.credits)) {
    roll = rollSlots();
    win = isWinning(roll);
  }

  if (win) {
    const payout = PAYOUTS[roll[0]];
    req.session.credits += payout;
    res.json({ roll, win: true, payout, credits: req.session.credits });
  } else {
    res.json({ roll, win: false, payout: 0, credits: req.session.credits });
  }
});

app.post('/api/cashout', (req, res) => {
  const cash = req.session.credits || 0;
  req.session.account += cash;
  req.session.credits = 0;
  res.json({ account: req.session.account });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



