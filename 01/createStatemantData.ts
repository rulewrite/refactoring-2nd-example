import createPerformanceCalculator from './createPerformanceCalculator';
import {
  EnrichPerformance,
  Invoice,
  Performance,
  Plays,
  Statement,
} from './interface';

export default function createStatementData(
  invoice: Invoice,
  plays: Plays
): Statement {
  const performances = invoice.performances.map(enrichPerformance);
  return {
    customer: invoice.customer,
    performances,
    totalAmount: totalAmount(performances),
    totalVolumeCredits: totalVolumeCredits(performances),
  };

  function totalAmount(performances: Array<EnrichPerformance>) {
    return performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(performances: Array<EnrichPerformance>) {
    return performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function enrichPerformance(aPerformance: Performance): EnrichPerformance {
    const play = playFor(aPerformance);
    const calculator = createPerformanceCalculator(aPerformance, play);

    return {
      ...aPerformance,
      play,
      amount: calculator.amount,
      volumeCredits: calculator.volumeCredits,
    };
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }
}
