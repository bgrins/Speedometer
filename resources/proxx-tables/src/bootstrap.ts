/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { wrap } from "comlink";

// import workerURL from "omt:./worker.js";

const logEl = document.querySelector("#log")!;
function log(msg: string) {
  logEl.innerHTML += `${msg}\n`;
}

/**
 * Inject a blob worker shim to make this work on null origins (<iframe sandbox>)
 * Note: stopped working.
 */
// const WORKER_URL = URL.createObjectURL(new Blob([
//   'Object.defineProperty(location,"href",{value:self.name});',
//   'importScripts(self.name);'
// ], { type: 'text/javascript' }));
// class Worker extends self.Worker {
//   constructor(url, opts) {
//     super(WORKER_URL, Object.assign({}, opts, { name: url, type: 'module' }));
//   }
// }

async function bootstrap() {
  log("Booting!");
  const params = new URL(location.toString()).searchParams;
  const ui = params.get("ui") || "preact";
  let seed = Number(params.get("seed") || "XXX");
  if (Number.isNaN(seed)) {
    seed = performance.now();
  }
  let size = Number(params.get("size") || "XXX");
  if (Number.isNaN(size)) {
    size = 40;
  }
  try {
    const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
    worker.addEventListener("error", e => {
      log(`Worker error: ${e.toString()}`);
    });
    worker.postMessage({ seed, size });

    const { stateService } = wrap(worker);

    switch (ui) {
      case "preact":
        {
          const preactService = await import("./services/preact/index.js");
          preactService.game(stateService as any);
        }
        break;
      case "canvas":
        {
          const canvasService = await import("./services/canvas/index.js");
          // tslint:disable-next-line:no-unused-expression
          new canvasService.default(stateService as any);
        }
        break;
      case "lit":
        {
          const litService = await import("./services/lit-element/index.js");
          // tslint:disable-next-line:no-unused-expression
          new litService.default(stateService as any);
        }
        break;
      default:
        throw Error("Invalid UI service name");
    }
  } catch (e) {
    log(`Caught throw: ${e.message}\n${e.stack}`);
  }
}

bootstrap();
