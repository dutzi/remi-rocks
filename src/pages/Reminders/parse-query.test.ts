import parseQuery from './parse-query';

it('should parse seconds', () => {
  expect(parseQuery('eat pizza 1s')).toEqual({
    message: 'eat pizza',
    time: 1,
    prettyTime: '1s',
  });
});

it('should parse mintues', () => {
  expect(parseQuery('buy milk 1m')).toEqual({
    message: 'buy milk',
    time: 60,
    prettyTime: '1m',
  });
});

it('should parse hours', () => {
  expect(parseQuery('stand up 1h')).toEqual({
    message: 'stand up',
    time: 60 * 60,
    prettyTime: '1h',
  });
});
