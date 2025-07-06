import { useEffect, useState } from 'react';
import Button from '../components/Button';
import './Game.css';

const SYMBOLS = { C: '🍒', L: '🍋', O: '🍊', W: '🍉' };

export default function Game() {
  const [credits, setCredits] = useState(0);
  const [slots, setSlots] = useState(['X', 'X', 'X']);
  const [spinning, setSpinning] = useState(false);

  const startGame = async () => {
    const res = await fetch('http://localhost:3000/api/start', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await res.json();
    setCredits(data.credits);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleRoll = async () => {
    setSpinning(true);
    setSlots(['X', 'X', 'X']);

    const result = await fetch('http://localhost:3000/api/roll', {
      method: 'POST',
      credentials: 'include'
    });

    const data = await result.json();
    if (data.error) return alert(data.error);

    [0, 1, 2].forEach(i => {
      setTimeout(() => {
        setSlots(prev => {
          const copy = [...prev];
          copy[i] = SYMBOLS[data.roll[i]];
          return copy;
        });
        if (i === 2) setCredits(data.credits);
      }, (i + 1) * 1000);
    });

    setTimeout(() => setSpinning(false), 3500);
  };

  const handleCashOut = async () => {
    const res = await fetch('http://localhost:3000/api/cashout', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await res.json();
    alert(`Cashed out: ${data.account} credits`);
    setCredits(0);
    setSlots(['X', 'X', 'X']);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Casino</h1>
      <div className="slot-container">
        {slots.map((s, i) => (
          <div key={i} className="slot-block">{s}</div>
        ))}
      </div>
      <div className="credits-display">Credits: <strong>{credits}</strong></div>
      <div className="button-group">
        <Button onClick={handleRoll} disabled={spinning}>Roll</Button>
        <Button onClick={handleCashOut} variant="cashout">Cash Out</Button>
      </div>
    </div>
  );
}
