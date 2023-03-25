// Todo receive options from `arguments` to match resources/params.mjs

// globalThis.URLSearchParams = class {
//   constructor(params) {
//     this.params = params;
//   }
//   get(key) {
//     return this.params[key];
//   }
//   has(key) {
//     return this.params[key] !== undefined;
//   }
//   delete(key) {
//     delete this.params[key];
//   }
// }

// load("resources/params.mjs");


let results = [];
globalThis.reportResults = ({
  suite,
  step,
  time
}) => {
  results.push({
    suite,
    step,
    time
  });
}


load("resources/todomvc/architecture-examples/backbone/index.js");

console.log("Suite compolete - results: " + JSON.stringify(results));