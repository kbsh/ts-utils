import * as TextHelper from './text-helper';

describe('TextHelper', () => {
  it('sprintf', () => {
    const data = '%saaaa%saaaaa%saaaaaaa%s';

    // 実行
    const actual = TextHelper.sprintf(data, 'b', 'cc', 'ddd', 'eeee');

    const expected = 'baaaaccaaaaadddaaaaaaaeeee';
    expect(actual).toBe(expected);
  });

  describe('zeroPadding', () => {
    const dataProvider = [
      {
        describe: 'パディングあり',
        value: 2,
        length: 2,
        expected: '02'
      },
      {
        describe: 'パディングなし',
        value: 11,
        length: 2,
        expected: '11'
      }
    ];

    dataProvider.forEach(data => {
      it(data.describe, () => {
        // 実行
        const actual = TextHelper.zeroPadding(data.value, data.length);

        // アサーション
        expect(actual).toBe(data.expected);
      });
    });
  });
});
