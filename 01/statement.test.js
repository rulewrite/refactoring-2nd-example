const { statement, htmlStatement } = require('./statement');
const plays = require('./plays.json');
const invoices = require('./invoices.json');

test('연극 비용 책정', () => {
  expect(statement(invoices[0], plays)).toBe(
    '청구 내역 (고객명: BigCo)\n  Hamlet: $650.00 (55석)\n  As Your Like It: $580.00 (35석)\n  Othello: $500.00 (40석)\n총액: $1,730.00\n적립 포인트: 47점\n'
  );
});

test('연극 비용 책정 HTML', () => {
  expect(htmlStatement(invoices[0], plays)).toBe(
    '<h1>청구 내역 (고객명: BigCo)</hi>\n<table>\n<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n  <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n  <tr><td>As Your Like It</td><td>35</td><td>$580.00</td></tr>\n  <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n</table>\n<p>총액: <em>$1,730.00</em></p>\n<p>적립 포인트: <em>$0.47</em>점</p>\n'
  );
});
