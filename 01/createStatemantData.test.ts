import createStatemantData from './createStatemantData';
import invoices from './invoices.json';
import plays from './plays.json';

test('연극 비용 책정', () => {
  expect(createStatemantData(invoices[0], plays)).toEqual({
    customer: 'BigCo',
    performances: [
      {
        amount: 65000,
        audience: 55,
        play: { name: 'Hamlet', type: 'tragedy' },
        playID: 'hamlet',
        volumeCredits: 25,
      },
      {
        amount: 58000,
        audience: 35,
        play: { name: 'As Your Like It', type: 'comedy' },
        playID: 'as-like',
        volumeCredits: 12,
      },
      {
        amount: 50000,
        audience: 40,
        play: { name: 'Othello', type: 'tragedy' },
        playID: 'othello',
        volumeCredits: 10,
      },
    ],
    totalAmount: 173000,
    totalVolumeCredits: 47,
  });
});
