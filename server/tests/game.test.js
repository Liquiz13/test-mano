const { shouldReroll, rollSlots, isWinning } = require('../services/game.service');

const SYMBOL_KEYS = ['C', 'L', 'O', 'W'];

describe('shouldReroll()', () => {
  test('returns false for credits < 40', () => {
    for (let i = 0; i < 10; i++) {
      expect(shouldReroll(10)).toBe(false);
      expect(shouldReroll(0)).toBe(false);
      expect(shouldReroll(39)).toBe(false);
    }
  });

  test('returns ~30% true for credits between 40 and 59', () => {
    let trueCount = 0;
    const tries = 1000;
    for (let i = 0; i < tries; i++) {
      if (shouldReroll(50)) trueCount++;
    }
    const percentage = trueCount / tries;
    expect(percentage).toBeGreaterThan(0.2);
    expect(percentage).toBeLessThan(0.4);
  });

  test('returns ~60% true for credits >= 60', () => {
    let trueCount = 0;
    const tries = 1000;
    for (let i = 0; i < tries; i++) {
      if (shouldReroll(70)) trueCount++;
    }
    const percentage = trueCount / tries;
    expect(percentage).toBeGreaterThan(0.5);
    expect(percentage).toBeLessThan(0.7);
  });
});

describe('rollSlots()', () => {
  test('returns array of 3 items', () => {
    const result = rollSlots();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
  });

  test('returns only valid symbol keys', () => {
    const result = rollSlots();
    result.forEach(symbol => {
      expect(SYMBOL_KEYS).toContain(symbol);
    });
  });
});

describe('isWinning()', () => {
  test('detects matching symbols', () => {
    expect(isWinning(['C', 'C', 'C'])).toBe(true);
    expect(isWinning(['L', 'L', 'L'])).toBe(true);
  });

  test('detects non-matching symbols', () => {
    expect(isWinning(['C', 'L', 'C'])).toBe(false);
    expect(isWinning(['O', 'W', 'O'])).toBe(false);
  });
});
