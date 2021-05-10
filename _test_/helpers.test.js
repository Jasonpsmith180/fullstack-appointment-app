const { format_date } = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date = new Date('2021-05-06 18:21:10');

    expect(format_date(date)).toBe('5/6/2021');
});