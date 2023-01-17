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
define(['./comlink-3caaf381'], function (comlink) { 'use strict';

  var xorshift$1 = {exports: {}};

  (function (module) {
  /**
   * Create a pseudorandom number generator, with a seed.
   * @param {array} seed "128-bit" integer, composed of 4x32-bit
   * integers in big endian order.
   */
  function XorShift(seed) {
    // Note the extension, this === module.exports is required because
    // the `constructor` function will be used to generate new instances.
    // In that case `this` will point to the default RNG, and `this` will
    // be an instance of XorShift.
    if (!(this instanceof XorShift) || this === module.exports) {
      return new XorShift(seed);
    }

    if (!Array.isArray(seed) || seed.length !== 4) {
      throw new TypeError('seed must be an array with 4 numbers');
    }

    // uint64_t s = [seed ...]
    this._state0U = seed[0] | 0;
    this._state0L = seed[1] | 0;
    this._state1U = seed[2] | 0;
    this._state1L = seed[3] | 0;
  }

  /**
   * Returns a 64bit random number as a 2x32bit array
   * @return {array}
   */
  XorShift.prototype.randomint = function() {
    // uint64_t s1 = s[0]
    var s1U = this._state0U, s1L = this._state0L;
    // uint64_t s0 = s[1]
    var s0U = this._state1U, s0L = this._state1L;

    // result = s0 + s1
    var sumL = (s0L >>> 0) + (s1L >>> 0);
    resU = (s0U + s1U + (sumL / 2 >>> 31)) >>> 0;
    resL = sumL >>> 0;

    // s[0] = s0
    this._state0U = s0U;
    this._state0L = s0L;

    // - t1 = [0, 0]
    var t1U = 0, t1L = 0;
    // - t2 = [0, 0]
    var t2U = 0, t2L = 0;

    // s1 ^= s1 << 23;
    // :: t1 = s1 << 23
    var a1 = 23;
    var m1 = 0xFFFFFFFF << (32 - a1);
    t1U = (s1U << a1) | ((s1L & m1) >>> (32 - a1));
    t1L = s1L << a1;
    // :: s1 = s1 ^ t1
    s1U = s1U ^ t1U;
    s1L = s1L ^ t1L;

    // t1 = ( s1 ^ s0 ^ ( s1 >> 17 ) ^ ( s0 >> 26 ) )
    // :: t1 = s1 ^ s0
    t1U = s1U ^ s0U;
    t1L = s1L ^ s0L;
    // :: t2 = s1 >> 18
    var a2 = 18;
    var m2 = 0xFFFFFFFF >>> (32 - a2);
    t2U = s1U >>> a2;
    t2L = (s1L >>> a2) | ((s1U & m2) << (32 - a2));
    // :: t1 = t1 ^ t2
    t1U = t1U ^ t2U;
    t1L = t1L ^ t2L;
    // :: t2 = s0 >> 5
    var a3 = 5;
    var m3 = 0xFFFFFFFF >>> (32 - a3);
    t2U = s0U >>> a3;
    t2L = (s0L >>> a3) | ((s0U & m3) << (32 - a3));
    // :: t1 = t1 ^ t2
    t1U = t1U ^ t2U;
    t1L = t1L ^ t2L;

    // s[1] = t1
    this._state1U = t1U;
    this._state1L = t1L;

    // return result
    return [resU, resL];
  };

  /**
   * Returns a random number normalized [0, 1), just like Math.random()
   * @return {number}
   */
  XorShift.prototype.random = function() {
    var t2 = this.randomint();
    // Math.pow(2, -32) = 2.3283064365386963e-10
    // Math.pow(2, -52) = 2.220446049250313e-16
    return t2[0] * 2.3283064365386963e-10 + (t2[1] >>> 12) * 2.220446049250313e-16;
  };

  // Seed with Math.random() by default to prevent seed collision
  function getRandomSeed() {
      return Math.random() * Math.pow(2, 32);
  }
  module.exports = new XorShift([
    getRandomSeed(),
    getRandomSeed(),
    getRandomSeed(),
    getRandomSeed()
  ]);
  }(xorshift$1));

  var xorshift = xorshift$1.exports;
  var resU, resL;

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
  function newCell(id) {
      return {
          hasMine: false,
          id,
          revealed: false,
          tag: 0 /* None */,
          touching: -1
      };
  }
  class MinesweeperGame {
      _width;
      _height;
      _mines;
      get state() {
          return this._state;
      }
      get flags() {
          return this._flags;
      }
      grid;
      startTime = 0;
      endTime = 0;
      _state = 0 /* Pending */;
      _toReveal = 0;
      _flags = 0;
      rng;
      constructor(_width, _height, _mines, seed = performance.now()) {
          this._width = _width;
          this._height = _height;
          this._mines = _mines;
          if (_mines < 1) {
              throw Error("Invalid number of mines");
          }
          if (_width < 1 || _height < 1) {
              throw Error("Invalid dimensions");
          }
          if (_mines >= _width * _height) {
              throw Error("Number of mines cannot fit in grid");
          }
          this.rng = seed ? new xorshift.constructor([seed, seed, seed, seed]) : xorshift;
          this._toReveal = _width * _height - _mines;
          this.grid = Array(_height)
              .fill(undefined)
              .map((_, rowIdx) => Array(_width)
              .fill(undefined)
              .map((_, cellIdx) => newCell(rowIdx * _width + cellIdx)));
      }
      reveal(x, y) {
          if (this._state === 0 /* Pending */) {
              this._placeMines(x, y);
              this.startTime = Date.now();
          }
          else if (this._state !== 1 /* Playing */) {
              throw Error("Game is not in a playable state");
          }
          const cell = this.grid[y][x];
          if (cell.tag === 1 /* Flag */) {
              throw Error("Cell flagged");
          }
          this._reveal(x, y);
      }
      tag(x, y, tag) {
          const oldCell = this.grid[y][x];
          if (oldCell.revealed) {
              throw Error("Revealed cell cannot be tagged");
          }
          if (oldCell.tag === tag) {
              return;
          }
          this._cloneUpwards(x, y, new WeakSet());
          const cell = this.grid[y][x];
          cell.tag = tag;
          if (tag === 1 /* Flag */) {
              this._flags += 1;
          }
          else if (oldCell.tag === 1 /* Flag */) {
              this._flags -= 1;
          }
      }
      /**
       * Reveal squares around the point. Returns true if successful.
       */
      attemptSurroundingReveal(x, y) {
          const cell = this.grid[y][x];
          const maybeReveal = [];
          if (!cell.revealed) {
              return false;
          }
          if (cell.touching === 0) {
              return false;
          }
          let flagged = 0;
          for (const [nextX, nextY] of this._iterateSurrounding(x, y)) {
              const nextCell = this.grid[nextY][nextX];
              if (nextCell.tag === 1 /* Flag */) {
                  flagged += 1;
                  continue;
              }
              maybeReveal.push([nextX, nextY]);
          }
          if (flagged < cell.touching) {
              return false;
          }
          if (maybeReveal.length === 0) {
              return false;
          }
          const objsCloned = new WeakSet();
          for (const [nextX, nextY] of maybeReveal) {
              const nextCell = this.grid[nextY][nextX];
              if (nextCell.revealed) {
                  continue;
              }
              this._reveal(nextX, nextY, objsCloned);
          }
          return true;
      }
      _endGame(state) {
          this._state = state;
          this.endTime = Date.now();
      }
      _placeMines(avoidX, avoidY) {
          const cells = this.grid.reduce((cells, row) => {
              cells.push(...row);
              return cells;
          }, []);
          // Remove the cell played.
          cells.splice(avoidY * this._width + avoidX, 1);
          // Place mines in remaining squares
          let minesToPlace = this._mines;
          while (minesToPlace) {
              const index = Math.floor(this.rng.random() * cells.length);
              const cell = cells[index];
              cells.splice(index, 1);
              cell.hasMine = true;
              minesToPlace -= 1;
          }
          this._state = 1 /* Playing */;
      }
      /**
       * This 'avoids' mutating the grid property, so it's easier to identify changes in Preact etc.
       *
       * @param x
       * @param y
       * @param objsCloned Objects that don't need cloning again.
       */
      _cloneUpwards(x, y, objsCloned) {
          // Hacky fix for ImmerJS
          return;
      }
      *_iterateSurrounding(x, y) {
          for (const nextY of [y - 1, y, y + 1]) {
              if (nextY < 0) {
                  continue;
              }
              if (nextY >= this._height) {
                  continue;
              }
              for (const nextX of [x - 1, x, x + 1]) {
                  if (nextX < 0) {
                      continue;
                  }
                  if (nextX >= this._width) {
                      continue;
                  }
                  if (x === nextX && y === nextY) {
                      continue;
                  }
                  yield [nextX, nextY];
              }
          }
      }
      /**
       * @param x
       * @param y
       * @param objsCloned A weakmap to track which objects have already been cloned.
       */
      _reveal(x, y, objsCloned = new WeakSet()) {
          // The set contains the cell position as if it were a single flat array.
          const revealSet = new Set([x + y * this._width]);
          for (const value of revealSet) {
              const x = value % this._width;
              const y = (value - x) / this._width;
              this._cloneUpwards(x, y, objsCloned);
              const cell = this.grid[y][x];
              if (cell.revealed) {
                  throw Error("Cell already revealed");
              }
              cell.revealed = true;
              if (cell.hasMine) {
                  this._endGame(2 /* Lost */);
                  return;
              }
              this._toReveal -= 1;
              if (this._toReveal === 0) {
                  this._endGame(3 /* Won */);
                  // Although the game is over, we still continue to calculate the touching value.
              }
              let touching = 0;
              const maybeReveal = [];
              // Go around the surrounding squares
              for (const [nextX, nextY] of this._iterateSurrounding(x, y)) {
                  const nextCell = this.grid[nextY][nextX];
                  if (nextCell.hasMine) {
                      touching += 1;
                  }
                  if (nextCell.tag === 1 /* Flag */ || nextCell.revealed) {
                      continue;
                  }
                  maybeReveal.push(nextX + nextY * this._width);
              }
              cell.touching = touching;
              // Don't reveal the surrounding squares if this is touching a mine.
              if (touching !== 0) {
                  continue;
              }
              for (const num of maybeReveal) {
                  revealSet.add(num);
              }
          }
      }
  }

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
  const DENSITY = 0.1;
  class StateService {
      size;
      seed;
      port = new MessageChannel().port1;
      game;
      constructor(size, seed) {
          this.size = size;
          this.seed = seed;
          this.game = new MinesweeperGame(this.size, this.size, Math.floor(this.size * this.size * DENSITY), seed);
      }
      get state() {
          return {
              grid: this.game.grid
          };
      }
      notify() {
          const ev = new CustomEvent("state", { detail: this.state });
          this.port.dispatchEvent(ev);
      }
      subscribe(f) {
          this.port.addEventListener("state", ((ev) => f(ev.detail)));
      }
      flag(x, y) {
          this.game.tag(x, y, 1 /* Flag */);
          this.notify();
      }
      unflag(x, y) {
          this.game.tag(x, y, 0 /* None */);
          this.notify();
      }
      reveal(x, y) {
          this.game.reveal(x, y);
          this.notify();
      }
  }

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
  addEventListener("message", function onMessage({ data }) {
      removeEventListener("message", onMessage);
      const { size, seed } = data;
      comlink.expose({
          stateService: new StateService(size, seed)
      }, self);
  });

});
//# sourceMappingURL=worker-709e5779.js.map
