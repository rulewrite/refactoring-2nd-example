export interface Performance {
  playID: string;
  audience: number;
}

export interface PerformanceCalculator {
  amount: number;
  volumeCredits: number;
}

export interface EnrichPerformance extends Performance, PerformanceCalculator {
  play: Play;
}

export interface Play {
  name: string;
  type: 'tragedy' | 'comedy';
}

export interface Statement {
  customer: string;
  performances: Array<EnrichPerformance>;
  totalAmount: number;
  totalVolumeCredits: number;
}

export interface Plays {
  [playID: string]: Play;
}

export interface Invoice {
  customer: string;
  performances: Array<Performance>;
}
