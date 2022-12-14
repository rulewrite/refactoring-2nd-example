import Province from './Province';
import { parseInteger } from './util';

export interface ProducerModel {
  name: string;
  cost: number;
  production: number;
}

export default class Producer {
  private _province: Province;
  private _cost: number;
  private _name: string;
  private _production: number;

  get name() {
    return this._name;
  }

  get cost() {
    return this._cost;
  }
  set cost(arg) {
    this._cost = arg;
  }

  get production(): number {
    return this._production;
  }
  set production(amountStr: string | number) {
    const amount = parseInteger(amountStr);
    this._production = Number.isNaN(amount) ? 0 : amount;
  }

  constructor(aProvince: Province, data: ProducerModel) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }
}
