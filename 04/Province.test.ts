import Province from './Province';

const sampleProvinceData = () => {
  return {
    name: 'Asia',
    demand: 30,
    price: 20,
    producers: [
      { name: 'Byzantium', cost: 10, production: 9 },
      { name: 'Attalia', cost: 12, production: 10 },
      { name: 'Sinope', cost: 10, production: 6 },
    ],
  };
};

describe('province', () => {
  test('shortfall', () => {
    const asis = new Province(sampleProvinceData());
    expect(asis.shortfall).toBe(5);
  });
});
