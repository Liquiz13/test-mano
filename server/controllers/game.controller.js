const { rollSlots, isWinning, shouldReroll, PAYOUTS } = require('../services/game.service');


exports.start = (req, res) => {
  req.session.credits = 10;
  req.session.account = 0;
  res.json({ credits: req.session.credits });
};

exports.roll = (req, res) => {
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
};

exports.cashout = (req, res) => {
  const cash = req.session.credits || 0;
  req.session.account += cash;
  req.session.credits = 0;
  res.json({ account: req.session.account });
};