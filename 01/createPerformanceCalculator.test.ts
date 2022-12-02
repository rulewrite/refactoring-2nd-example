import createPerformanceCalculator from './createPerformanceCalculator';
import { Plays } from './interface';
import invoices from './invoices.json';
import plays from './plays.json';

const calculators = invoices[0].performances.map((performance) => {
  const play = (plays as Plays)[performance.playID];

  return createPerformanceCalculator(performance, play);
});

test('연극 별 비용 책정', () => {
  calculators.forEach((calculator) => {
    expect(calculator.amount).toBeGreaterThan(-1);
  });
});

test('연극 별 포인트 책정', () => {
  calculators.forEach((calculator) => {
    expect(calculator.volumeCredits).toBeGreaterThan(-1);
  });
});
