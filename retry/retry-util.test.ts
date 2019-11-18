import retry from "./retry-util";

fdescribe("RetryUtil", () => {
  fdescribe("retry", () => {
    const funcMock = jasmine.createSpy("test");

    beforeEach(() => {
      funcMock.calls.reset();
    });

    fit("リトライ上限オーバー", async () => {
      // mock定義
      funcMock.and.throwError("");

      // リトライ上限オーバーしたか
      let isThrow = false;

      // 実行
      try {
        await retry(funcMock);
      } catch {
        isThrow = true;
      }

      // expect
      expect(funcMock.calls.count()).toEqual(4);
      expect(isThrow).toBeTruthy;
    });

    fit("リトライ上限オーバー option指定", async () => {
      // mock定義
      funcMock.and.throwError("");

      // リトライ上限オーバーしたか
      let isThrow = false;

      // 実行
      try {
        await retry(funcMock, { retryCount: 10, sleepSecond: 0 });
      } catch {
        isThrow = true;
      }

      // expect
      expect(funcMock.calls.count()).toEqual(11);
      expect(isThrow).toBeTruthy;
    });

    fit("初回で通過", async () => {
      // mock定義
      funcMock.and.returnValue(null);

      // リトライ上限オーバーしたか
      let isThrow = false;

      // 実行
      try {
        await retry(funcMock);
      } catch {
        isThrow = true;
      }

      // expect
      expect(funcMock.calls.count()).toEqual(1);
      expect(isThrow).toBeFalsy;
    });

    fit("1かいリトライ", async () => {
      const aa = jest
        .fn()
        .mockImplementationOnce(() => {
          throw new Error();
        })
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // 実行
      await retry(aa);

      // expect
      expect(aa.mock.calls.length).toBe(3);
    });
  });
});
