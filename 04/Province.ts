import Producer, { ProducerModel } from './Producer';
import { parseInteger } from './util';

export default class Province {
  private _producers: Array<Producer> = [];
  private _name: string;
  private _demand: number;
  private _price: number;

  get name() {
    return this._name;
  }

  get producers() {
    return this._producers.slice();
  }

  get totalProduction() {
    return this._producers.reduce((total, producer) => {
      return total + producer.production;
    }, 0);
  }

  get demand(): number {
    return this._demand;
  }
  set demand(arg: string | number) {
    const demand = parseInteger(arg);
    this._demand = demand < 0 ? 0 : demand;
  }

  get price(): number {
    return this._price;
  }
  set price(arg: string | number) {
    this._price = parseInteger(arg);
  }

  get shortfall() {
    return this._demand - this.totalProduction;
  }

  get profit() {
    return this.demandValud - this.demandCost;
  }

  get demandValud() {
    return this.satisfiedDemand * this.price;
  }

  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }

  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }

  constructor(doc: {
    name: string;
    demand: number;
    price: number;
    producers: Array<ProducerModel>;
  }) {
    this._name = doc.name;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producer(d)));
  }

  private addProducer(arg: Producer) {
    this._producers.push(arg);
  }
}
