import {
  EnrichPerformance,
  Invoice,
  Performance,
  Play,
  Plays,
  Statement,
} from './interface';

function getVolumeCredits(
  calculator: PerformanceCalculator,
  performance: Performance
) {
  const volumeCredits = Math.max(performance.audience - 30, 0);

  if (calculator instanceof ComedyCalculator) {
    return volumeCredits + Math.floor(performance.audience / 5);
  }

  return volumeCredits;
}

class PerformanceCalculator {
  get amount(): number | void {
    throw new Error('서브클래스에서 처리하도록 설계되었습니다.');
  }

  constructor(protected performance: Performance) {}
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }

  volumeCredits = getVolumeCredits(this, this.performance);
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  volumeCredits = getVolumeCredits(this, this.performance);
}

function createPerformanceCalculator(aPerformance: Performance, aPlay: Play) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance);
    case 'comedy':
      return new ComedyCalculator(aPerformance);
    default:
      throw new Error(`알 수 없는 장르: ${this.play.type}`);
  }
}

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
