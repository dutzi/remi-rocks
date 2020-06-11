import parseQuery from './parse-query';

it('should parse seconds', () => {
  expect(parseQuery('eat pizza 1s')).toEqual({
    message: 'eat pizza',
    time: 1,
  });
});

it('should parse mintues', () => {
  expect(parseQuery('buy milk 1m')).toEqual({
    message: 'buy milk',
    time: 60,
  });
});

it('should parse hours', () => {
  expect(parseQuery('stand up 1h')).toEqual({
    message: 'stand up',
    time: 60 * 60,
  });
});
