interface Performance {
  playID: string;
  audience: number;
}

interface EnrichPerformance extends Performance {
  play: Play;
  amount: number;
  volumeCredits: number;
}

interface Play {
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
