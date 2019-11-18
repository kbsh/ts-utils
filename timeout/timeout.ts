/**
 * エラーコード
 */
export enum ErrorCode {
  Error_1 = 'hoge',
  Error_2 = 'fuga'
}

/**
 * タイムアウト
 *
 * @param exec 処理
 * @param ms タイムアウト ミリ秒
 * @param errorCode エラーコード[option]
 */
export function timeout<T>(
  exec: Promise<T>,
  ms: number,
  errorCode: ErrorCode = ErrorCode.Error_1
): Promise<T> {
  const timeoutResult = 'timeout';
  let timeoutId: NodeJS.Timeout;

  const timeoutPromise = new Promise<typeof timeoutResult>(resolve => {
    timeoutId = setTimeout(() => resolve(timeoutResult), ms);
  });

  // 先に成功もしくは失敗した promise を返す
  return Promise.race([exec, timeoutPromise]).then(value => {
    console.log(value);
    if (value === timeoutResult) {
      // タイムアウト時
      throw new Error(errorCode);
    }

    // 非タイムアウト時
    clearTimeout(timeoutId);
    return value;
  });
}
