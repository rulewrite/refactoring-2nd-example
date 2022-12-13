// 예제 코드는 js지만 작성을 ts로 하기 때문에 필요한 가드
export const parseInteger = (arg: string | number) => {
  return typeof arg === 'string' ? parseInt(arg) : arg;
};
