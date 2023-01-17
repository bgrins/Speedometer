define(['exports', './comlink-3caaf381', './streams-c0bf06d5'], function (exports, comlink, streams) { 'use strict';

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
  class CanvasService {
      stateService;
      _canvas;
      _context;
      _state = null;
      _hasRendered;
      constructor(stateService) {
          this.stateService = stateService;
          const stateStream = new ReadableStream({
              async start(controller) {
                  // Make initial render ASAP
                  controller.enqueue(await stateService.state);
                  stateService.subscribe(comlink.proxy((state) => controller.enqueue(state)));
              }
          });
          streams.forEach(stateStream, async (state) => {
              this._state = state;
              this.render(state); // Future: Render function might just pull from state.
          });
          this._canvas = document.createElement("canvas");
          document.body.append(this._canvas);
          if (this._canvas) {
              this._canvas.addEventListener("click", this.onUnrevealedClick.bind(this));
              this._context = this._canvas.getContext("2d");
          }
      }
      render(state) {
          /** This event and attribute are used to tell the test harness rendering has completed. */
          Promise.resolve().then(() => {
              if (this._context) {
                  let color = this._context.getImageData(0, 0, 1, 1).data.join(',');
                  if (color !== '0,128,0,255') {
                      throw Error('Expected canvas color at [0,0] to be [0,128,0,255], but got [' + color + ']');
                  }
              }
              this._canvas.dispatchEvent(new Event('canvas-render', { bubbles: true }));
          });
          if (!this._hasRendered) {
              this._hasRendered = true;
              this._canvas.setAttribute('ready', '');
          }
          if (this._canvas === null) {
              return;
          }
          if (this._context === null || this._context === undefined) {
              return;
          }
          if (this._state === null) {
              return;
          }
          const cellHeight = 10;
          const cellWidth = 10;
          const gridSize = this._state.grid.length; // assuming square
          const context = this._context;
          this._canvas.width = this._state.grid.length * cellWidth;
          this._canvas.height = this._state.grid.length * cellHeight;
          for (let row = 0; row < gridSize; row++) {
              for (let col = 0; col < gridSize; col++) {
                  const cell = this._state.grid[row][col];
                  let drawText = false;
                  context.fillStyle = "green";
                  if (cell.revealed) {
                      if (cell.hasMine) {
                          context.fillStyle = "red";
                      }
                      else if (cell.touching > 0) {
                          drawText = true;
                      }
                      else if (cell.touching === 0) {
                          context.fillStyle = "white";
                      }
                  }
                  else {
                      if (cell.tag === 1 /* Flag */) {
                          context.fillStyle = "blue";
                      }
                      if (cell.tag === 2 /* Mark */) {
                          context.fillStyle = "yellow";
                      }
                  }
                  if (drawText) {
                      context.fillStyle = "white";
                      context.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
                      context.fillStyle = "black";
                      context.textAlign = "center";
                      context.fillText(cell.touching.toString(), col * cellWidth + cellWidth / 2, row * cellHeight + cellHeight);
                  }
                  else {
                      context.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
                  }
              }
          }
      }
      onUnrevealedClick(event) {
          if (event.target instanceof HTMLCanvasElement === false) {
              return;
          }
          if (this._state === null) {
              return;
          }
          event.target;
          const col = Math.floor(event.offsetX / 10);
          const row = Math.floor(event.offsetY / 10);
          const cell = this._state.grid[row][col];
          const tag = cell.tag;
          const touching = cell.touching;
          if (touching > 0) {
              if (!event.shiftKey) {
                  return;
              }
              this.stateService.reveal(col, row);
              return;
          }
          if (event.shiftKey) {
              if (tag === 0 /* None */) {
                  this.stateService.flag(col, row);
              }
              return;
          }
          if (tag === 1 /* Flag */) {
              return;
          }
          this.stateService.reveal(col, row);
      }
  }

  exports['default'] = CanvasService;

});
//# sourceMappingURL=index-f8c41d8e.js.map
