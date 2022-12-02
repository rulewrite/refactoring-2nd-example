import {
  EnrichPerformance,
  Invoice,
  Performance,
  Play,
  Plays,
  Statement,
} from './interface';

class PerformanceCalculator {
  get amount(): number | void {
    throw new Error('서브클래스에서 처리하도록 설계되었습니다.');
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }

  constructor(protected performance: Performance, public play: Play) {}
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
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

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

function createPerformanceCalculator(aPerformance: Performance, aPlay: Play) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay);
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
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );

    return {
      ...aPerformance,
      play: calculator.play,
      amount: calculator.amount,
      volumeCredits: calculator.volumeCredits,
    };
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }
}
