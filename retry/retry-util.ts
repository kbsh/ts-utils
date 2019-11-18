/**
 * リトライ回数 デフォルト
 */
const RETRY_COUNT = 3;
/**
 * リトライ時スリープ秒数 デフォルト
 */
const RETRY_SLEEP_SECOND = 1;

/**
 * option
 */
interface RetryOption {
  // リトライ回数
  retryCount?: number;
  // リトライ時のスリープ秒数
  sleepSecond?: number;
}

async function retry<T>(func: Function, option?: RetryOption): Promise<T> {
  const maxRetryCount =
    option && option.retryCount ? option.retryCount : RETRY_COUNT;
  const sleepSecond =
    option && option.sleepSecond !== undefined
      ? option.sleepSecond
      : RETRY_SLEEP_SECOND;

  let result: T;
  for (let retryCount = 0; retryCount <= maxRetryCount; retryCount++) {
    try {
      // 処理実行
      result = await func();
      // 例外が発生しなければforを抜ける
      break;
    } catch (error) {
      if (retryCount >= maxRetryCount) {
        // リトライ上限オーバー
        throw error;
      }
      // スリープ
      if (sleepSecond > 0) {
        await new Promise(resolve => setTimeout(resolve, sleepSecond * 1000));
      }
    }
  }
  return result!;
}

export default retry;
