import { useEffect, useState } from 'react';

const SYMBOLS = {
  C: '🍒',
  L: '🍋',
  O: '🍊',
  W: '🍉'
};

function App() {
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

  const roll = async () => {
    setSpinning(true);
    setSlots(['X', 'X', 'X']);
    const res = await fetch('http://localhost:3000/api/roll', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

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

  const cashout = async () => {
    const res = await fetch('http://localhost:3000/api/cashout', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await res.json();
    alert(`Cashed out: ${data.account} credits`);
    setCredits(0);
    setSlots(['X', 'X', 'X']);
  };

  useEffect(() => { startGame(); }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-green-100">
      <div className="text-3xl font-bold">Casino</div>
      <div className="flex space-x-4 text-6xl">
        {slots.map((s, i) => (
          <div key={i} className="w-20 h-20 border-4 border-black flex items-center justify-center bg-white">
            {s}
          </div>
        ))}
      </div>
      <div>Credits: <strong>{credits}</strong></div>
      <div className="space-x-4">
        <button onClick={roll} disabled={spinning} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">Roll</button>
        <button onClick={cashout} className="bg-yellow-500 text-white px-4 py-2 rounded">Cash Out</button>
      </div>
    </div>
  );
}

export default App;
