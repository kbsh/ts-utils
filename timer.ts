import { performance } from 'perf_hooks';

interface Log {
  key: string;
  time: number;
}

/**
 * [開発用]
 * 処理時間 を計測する
 *
 * usage
 *   Timer.add('start');
 *   Timer.add('処理1');
 *   Timer.add('処理2');
 *   Timer.add('end');
 *   Timer.print();
 *     -> start → 処理1 : 10ms
 *     -> 処理1 → 処理2 : 9ms
 *     -> 処理2 → end : 182ms
 */
export default class Timer {
  private static instance: Timer;
  private logs: Log[] = [];

  private constructor() {}

  /**
   * シングルトンインスタンス生成
   */
  private static getInstance() {
    if (!Timer.instance) {
      Timer.instance = new Timer();
    }
    return Timer.instance;
  }

  /**
   * 計測地点 を追加する
   *
   * @param key キー
   */
  public static add(key: string) {
    Timer.getInstance()._add(key);
  }
  private _add(key: string) {
    this.logs.push({
      key,
      time: performance.now()
    });
  }

  /**
   * 登録した計測地点間の処理時間をログ出力する
   */
  public static print() {
    Timer.getInstance()._print();
  }
  private _print() {
    let before: Log;
    this.logs.forEach(log => {
      if (before) {
        console.log(
          `${before.key} → ${log.key}`,
          `${log.time - before.time} ms`
        );
      }
      before = log;
    });

    // 初期化
    this._clear();
  }

  /**
   * 初期化
   */
  private _clear() {
    this.logs = [];
  }
}
