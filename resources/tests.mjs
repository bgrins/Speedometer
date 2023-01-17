import { BenchmarkTestStep } from './benchmark-runner.mjs';

const numberOfItemsToAdd = 100;
export const Suites = [];

Suites.push({
    name: 'VanillaJS-TodoMVC',
    url: 'todomvc/vanilla-examples/vanillajs/index.html',
    async prepare(page) {
        (await page.waitForElement('.new-todo')).focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.dispatchEvent('change');
                newTodo.enter('keypress');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingAllItems', page => {
            const deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ]
});

Suites.push({
    name: 'Vanilla-ES2015-TodoMVC',
    url: 'todomvc/vanilla-examples/es2015/index.html',
    async prepare(page) {
        const element = await page.waitForElement('.new-todo');
        element.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.dispatchEvent('change');
                newTodo.enter('keypress');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingItems', page => {
            const deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ]
});

Suites.push({
    name: 'Vanilla-ES2015-Babel-Webpack-TodoMVC',
    url: 'todomvc/vanilla-examples/es2015-babel-webpack/dist/index.html',
    async prepare(page) {
        const element = await page.waitForElement('.new-todo');
        element.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.dispatchEvent('change');
                newTodo.enter('keypress');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingItems', page => {
            const deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ]
});

Suites.push({
    name: 'React-TodoMVC',
    url: 'todomvc/architecture-examples/react/index.html',
    async prepare(page) {
        const element = await page.waitForElement('.new-todo');
        element.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.dispatchEvent('input');
                newTodo.enter('keydown');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingAllItems', page => {
            const deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ]
});

Suites.push({
    name: 'React-Redux-TodoMVC',
    url: 'todomvc/architecture-examples/react-redux/dist/index.html',
    async prepare(page) {
        const element = await page.waitForElement('.new-todo');
        element.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.enter('keydown');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingItems', page => {
            const deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ]
});

Suites.push({
    name: 'EmberJS-TodoMVC',
    url: 'todomvc/architecture-examples/emberjs/dist/index.html',
    async prepare(page) {
        const element = await page.waitForElement('.new-todo');
        element.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.enter('keydown');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingItems', page => {
            const deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ]
});

Suites.push({
    name: 'EmberJS-Debug-TodoMVC',
    url: 'todomvc/architecture-examples/emberjs-debug/index.html',
    async prepare(page) {
        const element = await page.waitForElement('#new-todo');
        element.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.getElementById('new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.enter('keydown');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingItems', page => {
            const deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ]
});

Suites.push({
    name: 'BackboneJS-TodoMVC',
    url: 'todomvc/architecture-examples/backbone/index.html',
    async prepare(page) {
        await page.waitForElement('#appIsReady');
        const newTodo = page.querySelector('.new-todo');
        newTodo.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.dispatchEvent('change');
                newTodo.enter('keypress');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingAllItems', page => {
            const deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ]
});

Suites.push({
    name: 'AngularJS-TodoMVC',
    url: 'todomvc/architecture-examples/angularjs/index.html',
    async prepare(page) {
        const element = await page.waitForElement('#new-todo');
        element.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            const form = page.querySelector('form');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.dispatchEvent('input');
                form.dispatchEvent('submit');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingAllItems', page => {
            for (let i = 0; i < numberOfItemsToAdd; i++)
                page.querySelector('.destroy').click();
        }),
    ]
});

Suites.push({
    name: 'Angular2-TypeScript-TodoMVC',
    url: 'todomvc/architecture-examples/angular/dist/index.html',
    async prepare(page) {
        const element = await page.waitForElement('.new-todo');
        element.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.dispatchEvent('input');
                newTodo.enter('keyup');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingItems', page => {
            const deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ]
});

Suites.push({
    name: 'VueJS-TodoMVC',
    url: 'todomvc/architecture-examples/vuejs-cli/dist/index.html',
    async prepare(page) {
        const element = await page.waitForElement('.new-todo');
        element.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.dispatchEvent('input');
                newTodo.enter('keyup');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingAllItems', page => {
            const deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ]
});

Suites.push({
    name: 'jQuery-TodoMVC',
    url: 'todomvc/architecture-examples/jquery/index.html',
    async prepare(page) {
        await page.waitForElement('#appIsReady');
        const newTodo = page.getElementById('new-todo');
        newTodo.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.enter('keyup');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingAllItems', page => {
            for (let i = 0; i < numberOfItemsToAdd; i++)
                page.querySelector('.destroy').click();
        }),
    ]
})

Suites.push({
    name: 'Preact-TodoMVC',
    url: 'todomvc/architecture-examples/preact/dist/index.html',
    async prepare(page) {
        const element = await page.waitForElement('.new-todo');
        element.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.enter('keydown');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingItems', page => {
            const deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ]
});

Suites.push({
    name: 'Inferno-TodoMVC',
    url: 'todomvc/architecture-examples/inferno/index.html',
    async prepare(page) {
        const element = await page.waitForElement('.new-todo');
        element.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.dispatchEvent('change');
                newTodo.enter('keydown');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            const checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingItems', page => {
            const deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                page.querySelector('.destroy').click();
        }),
    ]
});


Suites.push({
    name: 'Elm-TodoMVC',
    url: 'todomvc/functional-prog-examples/elm/index.html',
    async prepare(page) {
        const element = await page.waitForElement('.new-todo');
        element.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.querySelector('.new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.dispatchEvent('input');
                page.call('processElmWorkQueue');
                newTodo.enter('keydown');
                page.call('processElmWorkQueue');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            let checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                checkboxes[i].click();
                page.call('processElmWorkQueue');
            }
        }),
        new BenchmarkTestStep('DeletingItems', page => {
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                page.querySelector('.destroy').click();
                page.call('processElmWorkQueue');
            }
        }),
    ]
});

Suites.push({
    name: 'Flight-TodoMVC',
    url: 'todomvc/dependency-examples/flight/flight/index.html',
    async prepare(page) {
        await page.waitForElement('#appIsReady');
        const newTodo = page.getElementById('new-todo');
        newTodo.focus();
    },
    tests: [
        new BenchmarkTestStep('Adding' + numberOfItemsToAdd + 'Items', page => {
            const newTodo = page.getElementById('new-todo');
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue('Something to do ' + i);
                newTodo.enter('keydown');
            }
        }),
        new BenchmarkTestStep('CompletingAllItems', page => {
            let checkboxes = page.querySelectorAll('.toggle');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep('DeletingItems', page => {
            let deleteButtons = page.querySelectorAll('.destroy');
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ]
});

const PROXX_EXPANDS = [
    [2, 2],
    [0, 30],
    [15, 23],
    [11, 20],
    [18, 6],
    [10, 2],
    [31, 3],
    [24, 13],
  ];
  
  const PROXX_EXPANDS_LARGE = [
    [3, 3],
    [19, 8],
    [13, 29],
    [19, 51],
    [13, 82],
    [26, 93],
    [3, 83],
    [4, 60],
    [39, 62],
  ];
  
  // http://localhost:8003/InteractiveRunner.html?suite=Proxx-Tables&startAutomatically=true
  Suites.push({
    name: "Proxx-Tables",
    url: "proxx-tables/dist/index.html?seed=1&size=40",
    async prepare(page) {
      await page.waitForElement(
        "tr:last-child td:nth-child(36) button.cell.unrevealed",
        1000
      );
      await page.waitForElement(
        'tr > td > div[data-state="unrevealed"] > button.cell.unrevealed',
        1000
      );
    },
    tests: [
      new BenchmarkTestStep("Expand 1000 squares", async (page) => {
        // await page.startBuffer(true);
  
        for (const [row, col] of PROXX_EXPANDS) {
          page.querySelector(
            `tr:nth-child(${row + 1}) td:nth-child(${col + 1}) button`
          ).click()
          await page.waitForMutation(
            `tr:nth-child(${row + 1}) td:nth-child(${col + 2}) button`,
            ":not(.unrevealed)"
          );
          await page.forceLayout(
            `tr:nth-child(${row + 1}) td:nth-child(${col + 2})`
          );
        }
  
        // await page.flush();
      }),
    ],
  });