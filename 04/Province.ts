import Producer, { ProducerModel } from './Producer';
import { parseInteger } from './util';

export default class Province {
  private _producers: Array<Producer> = [];
  private _totalProduction = 0;
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
    return this._totalProduction;
  }
  set totalProduction(arg: number) {
    this._totalProduction = arg;
  }

  get demand(): number {
    return this._demand;
  }
  set demand(arg: string | number) {
    this._demand = parseInteger(arg);
  }

  get price(): number {
    return this._price;
  }
  set price(arg: string | number) {
    this._price = parseInteger(arg);
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
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }

  private addProducer(arg: Producer) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }
}
