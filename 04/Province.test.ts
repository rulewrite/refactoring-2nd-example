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
  /**
   * Don't
   * 테스트 관련 버그 중 가장 지저분한 유형 "테스트 끼리 상호작용하게 하는 공유 픽스처"를 생성하는 원인.
   * 즉, 테스트를 실행하는 순서에 따라 결과가 달라질 수 있다.
   * const asis = new Province(sampleProvinceData());
   */
  // 테스트마다 독립적인 픽스처가 생성되도록
  let asis: Province;
  beforeEach(() => {
    asis = new Province(sampleProvinceData());
  });

  test('shortfall', () => {
    expect(asis.shortfall).toBe(5);
  });

  test('profit', () => {
    expect(asis.profit).toBe(230);
  });

  test('change production', () => {
    asis.producers[0].production = 20;
    expect(asis.shortfall).toBe(-6);
    expect(asis.profit).toBe(292);
  });

  test('zero demand', () => {
    asis.demand = 0;
    expect(asis.shortfall).toBe(-25);
    expect(asis.profit).toBe(0);
  });

  test('negative demand', () => {
    asis.demand = -1;
    expect(asis.shortfall).toBe(-25);
    expect(asis.profit).toBe(0);
  });
});

describe('no producers', () => {
  let noProducers: Province;
  beforeEach(() => {
    noProducers = new Province({
      name: 'No producers',
      producers: [],
      demand: 30,
      price: 20,
    });
  });

  test('shortfall', () => {
    expect(noProducers.shortfall).toBe(30);
  });

  test('profit', () => {
    expect(noProducers.profit).toBe(0);
  });
});
