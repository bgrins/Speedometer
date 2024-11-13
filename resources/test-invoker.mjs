class TestInvoker {
    constructor(syncCallback, asyncCallback, reportCallback, params) {
        this._syncCallback = syncCallback;
        this._asyncCallback = asyncCallback;
        this._reportCallback = reportCallback;
        this._params = params;
    }
}

export class TimerTestInvoker extends TestInvoker {
    start() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this._syncCallback();
                setTimeout(() => {
                    this._asyncCallback();
                    requestAnimationFrame(async () => {
                        await this._reportCallback();
                        resolve();
                    });
                }, 0);
            }, this._params.waitBeforeSync);
        });
    }
}

class AsyncTimerTestInvoker extends TestInvoker {
    start() {
        return new Promise((resolve) => {
            setTimeout(async () => {
                await this._syncCallback();
                setTimeout(() => {
                    this._asyncCallback();
                    requestAnimationFrame(async () => {
                        await this._reportCallback();
                        resolve();
                    });
                }, 0);
            }, this._params.waitBeforeSync);
        });
    }
}

class BaseRAFTestInvoker extends TestInvoker {
    start() {
        return new Promise((resolve) => {
            if (this._params.waitBeforeSync)
                setTimeout(() => this._scheduleCallbacks(resolve), this._params.waitBeforeSync);
            else
                this._scheduleCallbacks(resolve);
        });
    }
}

class RAFTestInvoker extends BaseRAFTestInvoker {
    _scheduleCallbacks(resolve) {
        requestAnimationFrame(() => this._syncCallback());
        requestAnimationFrame(() => {
            setTimeout(() => {
                this._asyncCallback();
                setTimeout(async () => {
                    await this._reportCallback();
                    resolve();
                }, 0);
            }, 0);
        });
    }
}

class AsyncRAFTestInvoker extends BaseRAFTestInvoker {
    _scheduleCallbacks(resolve) {
        requestAnimationFrame(async () => {
            await this._syncCallback();
            requestAnimationFrame(() => {
                setTimeout(() => {
                    this._asyncCallback();
                    setTimeout(async () => {
                        await this._reportCallback();
                        resolve();
                    }, 0);
                }, 0);
            });
        });
    }
}

export const TEST_INVOKER_LOOKUP = {
    __proto__: null,
    timer: TimerTestInvoker,
    raf: RAFTestInvoker,
};

export const ASYNC_TEST_INVOKER_LOOKUP = {
    __proto__: null,
    timer: AsyncTimerTestInvoker,
    raf: AsyncRAFTestInvoker,
};