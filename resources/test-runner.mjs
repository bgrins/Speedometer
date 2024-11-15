import { TEST_INVOKER_LOOKUP, ASYNC_TEST_INVOKER_LOOKUP } from "./test-invoker.mjs";

export class TestRunner {
    #frame;
    #page;
    #params;
    #suite;
    #test;
    #callback;

    constructor(frame, page, params, suite, test, callback) {
        this.#suite = suite;
        this.#test = test;
        this.#params = params;
        this.#callback = callback;

        this.#page = page;
        this.#frame = frame;
    }

    getFrame() {
        return this.#frame;
    }

    getPage() {
        return this.#page;
    }

    getParams() {
        return this.#params;
    }

    getSuite() {
        return this.#suite;
    }

    getTest() {
        return this.#test;
    }

    getCallback() {
        return this.#callback;
    }

    async runTest() {
        // Prepare all mark labels outside the measuring loop.
        const suiteName = this.#suite.name;
        const testName = this.#test.name;
        const syncStartLabel = `${suiteName}.${testName}-start`;
        const syncEndLabel = `${suiteName}.${testName}-sync-end`;
        const asyncStartLabel = `${suiteName}.${testName}-async-start`;
        const asyncEndLabel = `${suiteName}.${testName}-async-end`;

        let syncTime;
        let asyncStartTime;
        let asyncTime;

        const runSync = () => {
            if (this.#params.warmupBeforeSync) {
                performance.mark("warmup-start");
                const startTime = performance.now();
                // Infinite loop for the specified ms.
                while (performance.now() - startTime < this.#params.warmupBeforeSync)
                    continue;
                performance.mark("warmup-end");
            }
            performance.mark(syncStartLabel);
            const syncStartTime = performance.now();
            this.#test.run(this.#page);
            const syncEndTime = performance.now();
            performance.mark(syncEndLabel);

            syncTime = syncEndTime - syncStartTime;

            performance.mark(asyncStartLabel);
            asyncStartTime = performance.now();
        };
        const measureAsync = () => {
            const bodyReference = this.#frame ? this.#frame.contentDocument.body : document.body;
            const windowReference = this.#frame ? this.#frame.contentWindow : window;
            // Some browsers don't immediately update the layout for paint.
            // Force the layout here to ensure we're measuring the layout time.
            const height = bodyReference.getBoundingClientRect().height;
            windowReference._unusedHeightValue = height; // Prevent dead code elimination.

            const asyncEndTime = performance.now();
            performance.mark(asyncEndLabel);

            asyncTime = asyncEndTime - asyncStartTime;

            if (this.#params.warmupBeforeSync)
                performance.measure("warmup", "warmup-start", "warmup-end");
            performance.measure(`${suiteName}.${testName}-sync`, syncStartLabel, syncEndLabel);
            performance.measure(`${suiteName}.${testName}-async`, asyncStartLabel, asyncEndLabel);
        };

        const report = () => this.#callback(this.#test, syncTime, asyncTime);
        const invokerClass = TEST_INVOKER_LOOKUP[this.#params.measurementMethod];
        const invoker = new invokerClass(runSync, measureAsync, report, this.#params);

        return invoker.start();
    }
}

export class AsyncTestRunner extends TestRunner {
    async runTest() {
        const params = this.getParams();
        const test = this.getTest();
        const frame = this.getFrame();
        // Prepare all mark labels outside the measuring loop.
        const suiteName = this.getSuite().name;
        const testName = test.name;
        const syncStartLabel = `${suiteName}.${testName}-start`;
        const syncEndLabel = `${suiteName}.${testName}-sync-end`;
        const asyncStartLabel = `${suiteName}.${testName}-async-start`;
        const asyncEndLabel = `${suiteName}.${testName}-async-end`;

        let syncTime;
        let asyncStartTime;
        let asyncTime;

        const runSync = async () => {
            if (params.warmupBeforeSync) {
                performance.mark("warmup-start");
                const startTime = performance.now();
                // Infinite loop for the specified ms.
                while (performance.now() - startTime < params.warmupBeforeSync)
                    continue;
                performance.mark("warmup-end");
            }
            performance.mark(syncStartLabel);
            const syncStartTime = performance.now();
            await test.run(this.getPage);
            const syncEndTime = performance.now();
            performance.mark(syncEndLabel);

            syncTime = syncEndTime - syncStartTime;

            performance.mark(asyncStartLabel);
            asyncStartTime = performance.now();
        };
        const measureAsync = () => {
            const bodyReference = frame ? frame.contentDocument.body : document.body;
            const windowReference = frame ? frame.contentWindow : window;
            // Some browsers don't immediately update the layout for paint.
            // Force the layout here to ensure we're measuring the layout time.
            const height = bodyReference.getBoundingClientRect().height;
            windowReference._unusedHeightValue = height; // Prevent dead code elimination.

            const asyncEndTime = performance.now();
            performance.mark(asyncEndLabel);

            asyncTime = asyncEndTime - asyncStartTime;

            if (params.warmupBeforeSync)
                performance.measure("warmup", "warmup-start", "warmup-end");
            performance.measure(`${suiteName}.${testName}-sync`, syncStartLabel, syncEndLabel);
            performance.measure(`${suiteName}.${testName}-async`, asyncStartLabel, asyncEndLabel);
        };

        const report = () => this.getCallback()(test, syncTime, asyncTime);
        const invokerClass = ASYNC_TEST_INVOKER_LOOKUP[params.measurementMethod];
        const invoker = new invokerClass(runSync, measureAsync, report, params);

        return invoker.start();
    }
}

// FIXME: implement remote steps
class RemoteTestRunner extends TestRunner {}

export const TEST_RUNNER_LOOKUP = {
    __proto__: null,
    default: TestRunner,
    async: AsyncTestRunner,
    remote: RemoteTestRunner,
};
