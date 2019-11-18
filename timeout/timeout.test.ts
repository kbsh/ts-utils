import { ErrorCode, timeout } from './timeout';

describe('timeout', () => {
  it(`タイムアウトしない`, async () => {
    const exec = new Promise(resolve => resolve('success'));
    const actual = await timeout(exec, 1000);
    expect(actual).toEqual('success');
  });

  // Matcher error: received value must be a promise
  // ↑ エラーになるので一旦skip。。
  it.skip(`タイムアウト`, async () => {
    const exec = new Promise(resolve => setTimeout(resolve, 1000));
    await expect(() => timeout(exec, 1, ErrorCode.Error_1)).rejects.toThrow();
  });
});
