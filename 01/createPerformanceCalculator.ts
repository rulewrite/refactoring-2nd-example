import { Performance, PerformanceCalculator, Play } from './interface';

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

class TragedyCalculator implements PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }

  volumeCredits = getVolumeCredits(this, this.performance);

  constructor(private performance: Performance) {}
}

class ComedyCalculator implements PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  volumeCredits = getVolumeCredits(this, this.performance);

  constructor(private performance: Performance) {}
}

export default function createPerformanceCalculator(
  aPerformance: Performance,
  aPlay: Play
) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance);
    case 'comedy':
      return new ComedyCalculator(aPerformance);
    default:
      throw new Error(`알 수 없는 장르: ${this.play.type}`);
  }
}
