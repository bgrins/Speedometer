/**
 * Copyright 2018 Google Inc. All Rights Reserved.
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

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['module', 'require', './comlink-3caaf381'], function (module, require, comlink) { 'use strict';

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
  // import workerURL from "omt:./worker.js";
  const logEl = document.querySelector("#log");
  function log(msg) {
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
          const worker = new Worker(new URL("worker-709e5779.js", module.uri));
          worker.addEventListener("error", e => {
              log(`Worker error: ${e.toString()}`);
          });
          worker.postMessage({ seed, size });
          const { stateService } = comlink.wrap(worker);
          switch (ui) {
              case "preact":
                  {
                      const preactService = await require('./index-1f279be0');
                      preactService.game(stateService);
                  }
                  break;
              case "canvas":
                  {
                      const canvasService = await require('./index-f8c41d8e');
                      // tslint:disable-next-line:no-unused-expression
                      new canvasService.default(stateService);
                  }
                  break;
              case "lit":
                  {
                      const litService = await require('./index-fb86cf9d');
                      // tslint:disable-next-line:no-unused-expression
                      new litService.default(stateService);
                  }
                  break;
              default:
                  throw Error("Invalid UI service name");
          }
      }
      catch (e) {
          log(`Caught throw: ${e.message}\n${e.stack}`);
      }
  }
  bootstrap();

});
//# sourceMappingURL=bootstrap-fecd33c7.js.map
