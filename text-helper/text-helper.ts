/**
 * 文字列中の「%s」を指定した文字列に置換して返却する
 * @param format 変換元の文字列
 * @param args 「%s」を置換する文字列
 */
export function sprintf(format: string, ...args: string[]) {
  let i = 0;
  return format.replace(/%s/g, () => args[i++]);
}

/**
 * ゼロ埋めを行う
 *
 * @param value ゼロ埋めを行う値
 * @param lengthOption 桁数
 */
export function zeroPadding(value: number | string, length: number): string {
  return ('0'.repeat(length) + value).slice(-length);
}
