import { BenchmarkTestStep } from "./benchmark-runner.mjs";

const numberOfItemsToAdd = 100;
export const Suites = [];

Suites.enable = function (names) {
    const lowerCaseNames = names.map((each) => each.toLowerCase());
    let found = false;
    this.forEach((suite) => {
        if (lowerCaseNames.includes(suite.name.toLowerCase())) {
            suite.disabled = false;
            found = true;
        } else {
            suite.disabled = true;
        }
    });
    return found;
};

Suites.push({
    name: "VanillaJS-TodoMVC",
    url: "todomvc/vanilla-examples/vanillajs/index.html",
    async prepare(page) {
        (await page.waitForElement(".new-todo")).focus();
    },
    tests: [
        new BenchmarkTestStep(`Adding${numberOfItemsToAdd}Items`, (page) => {
            const newTodo = page.querySelector(".new-todo");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue(`Something to do ${i}`);
                newTodo.dispatchEvent("change");
                newTodo.enter("keypress");
            }
        }),
        new BenchmarkTestStep("CompletingAllItems", (page) => {
            const checkboxes = page.querySelectorAll(".toggle");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep("DeletingAllItems", (page) => {
            const deleteButtons = page.querySelectorAll(".destroy");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ],
});

Suites.push({
    name: "Vanilla-ES2015-TodoMVC",
    url: "todomvc/vanilla-examples/es2015/index.html",
    async prepare(page) {
        const element = await page.waitForElement(".new-todo");
        element.focus();
    },
    tests: [
        new BenchmarkTestStep(`Adding${numberOfItemsToAdd}Items`, (page) => {
            const newTodo = page.querySelector(".new-todo");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue(`Something to do ${i}`);
                newTodo.dispatchEvent("change");
                newTodo.enter("keypress");
            }
        }),
        new BenchmarkTestStep("CompletingAllItems", (page) => {
            const checkboxes = page.querySelectorAll(".toggle");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep("DeletingItems", (page) => {
            const deleteButtons = page.querySelectorAll(".destroy");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ],
});

Suites.push({
    name: "Vanilla-ES2015-Babel-Webpack-TodoMVC",
    url: "todomvc/vanilla-examples/es2015-babel-webpack/dist/index.html",
    async prepare(page) {
        const element = await page.waitForElement(".new-todo");
        element.focus();
    },
    tests: [
        new BenchmarkTestStep(`Adding${numberOfItemsToAdd}Items`, (page) => {
            const newTodo = page.querySelector(".new-todo");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue(`Something to do ${i}`);
                newTodo.dispatchEvent("change");
                newTodo.enter("keypress");
            }
        }),
        new BenchmarkTestStep("CompletingAllItems", (page) => {
            const checkboxes = page.querySelectorAll(".toggle");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep("DeletingItems", (page) => {
            const deleteButtons = page.querySelectorAll(".destroy");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ],
});

Suites.push({
    name: "React-TodoMVC",
    url: "todomvc/architecture-examples/react/index.html",
    async prepare(page) {
        const element = await page.waitForElement(".new-todo");
        element.focus();
    },
    tests: [
        new BenchmarkTestStep(`Adding${numberOfItemsToAdd}Items`, (page) => {
            const newTodo = page.querySelector(".new-todo");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue(`Something to do ${i}`);
                newTodo.dispatchEvent("input");
                newTodo.enter("keydown");
            }
        }),
        new BenchmarkTestStep("CompletingAllItems", (page) => {
            const checkboxes = page.querySelectorAll(".toggle");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep("DeletingAllItems", (page) => {
            const deleteButtons = page.querySelectorAll(".destroy");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ],
});

Suites.push({
    name: "React-Redux-TodoMVC",
    url: "todomvc/architecture-examples/react-redux/dist/index.html",
    async prepare(page) {
        const element = await page.waitForElement(".new-todo");
        element.focus();
    },
    tests: [
        new BenchmarkTestStep(`Adding${numberOfItemsToAdd}Items`, (page) => {
            const newTodo = page.querySelector(".new-todo");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue(`Something to do ${i}`);
                newTodo.enter("keydown");
            }
        }),
        new BenchmarkTestStep("CompletingAllItems", (page) => {
            const checkboxes = page.querySelectorAll(".toggle");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep("DeletingItems", (page) => {
            const deleteButtons = page.querySelectorAll(".destroy");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ],
});

Suites.push({
    name: "EmberJS-TodoMVC",
    url: "todomvc/architecture-examples/emberjs/dist/index.html",
    async prepare(page) {
        const element = await page.waitForElement(".new-todo");
        element.focus();
    },
    tests: [
        new BenchmarkTestStep(`Adding${numberOfItemsToAdd}Items`, (page) => {
            const newTodo = page.querySelector(".new-todo");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue(`Something to do ${i}`);
                newTodo.enter("keydown");
            }
        }),
        new BenchmarkTestStep("CompletingAllItems", (page) => {
            const checkboxes = page.querySelectorAll(".toggle");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep("DeletingItems", (page) => {
            const deleteButtons = page.querySelectorAll(".destroy");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ],
});

Suites.push({
    name: "BackboneJS-TodoMVC",
    url: "todomvc/architecture-examples/backbone/index.html",
    async prepare(page) {
        await page.waitForElement("#appIsReady");
        const newTodo = page.querySelector(".new-todo");
        newTodo.focus();
    },
    tests: [
        new BenchmarkTestStep(`Adding${numberOfItemsToAdd}Items`, (page) => {
            const newTodo = page.querySelector(".new-todo");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue(`Something to do ${i}`);
                newTodo.dispatchEvent("change");
                newTodo.enter("keypress");
            }
        }),
        new BenchmarkTestStep("CompletingAllItems", (page) => {
            const checkboxes = page.querySelectorAll(".toggle");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep("DeletingAllItems", (page) => {
            const deleteButtons = page.querySelectorAll(".destroy");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ],
});

Suites.push({
    name: "Angular2-TypeScript-TodoMVC",
    url: "todomvc/architecture-examples/angular/dist/index.html",
    async prepare(page) {
        const element = await page.waitForElement(".new-todo");
        element.focus();
    },
    tests: [
        new BenchmarkTestStep(`Adding${numberOfItemsToAdd}Items`, (page) => {
            const newTodo = page.querySelector(".new-todo");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue(`Something to do ${i}`);
                newTodo.dispatchEvent("input");
                newTodo.enter("keyup");
            }
        }),
        new BenchmarkTestStep("CompletingAllItems", (page) => {
            const checkboxes = page.querySelectorAll(".toggle");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep("DeletingItems", (page) => {
            const deleteButtons = page.querySelectorAll(".destroy");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ],
});

Suites.push({
    name: "VueJS-TodoMVC",
    url: "todomvc/architecture-examples/vuejs-cli/dist/index.html",
    async prepare(page) {
        const element = await page.waitForElement(".new-todo");
        element.focus();
    },
    tests: [
        new BenchmarkTestStep(`Adding${numberOfItemsToAdd}Items`, (page) => {
            const newTodo = page.querySelector(".new-todo");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue(`Something to do ${i}`);
                newTodo.dispatchEvent("input");
                newTodo.enter("keyup");
            }
        }),
        new BenchmarkTestStep("CompletingAllItems", (page) => {
            const checkboxes = page.querySelectorAll(".toggle");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep("DeletingAllItems", (page) => {
            const deleteButtons = page.querySelectorAll(".destroy");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ],
});

Suites.push({
    name: "jQuery-TodoMVC",
    url: "todomvc/architecture-examples/jquery/index.html",
    async prepare(page) {
        await page.waitForElement("#appIsReady");
        const newTodo = page.getElementById("new-todo");
        newTodo.focus();
    },
    tests: [
        new BenchmarkTestStep(`Adding${numberOfItemsToAdd}Items`, (page) => {
            const newTodo = page.querySelector(".new-todo");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue(`Something to do ${i}`);
                newTodo.enter("keyup");
            }
        }),
        new BenchmarkTestStep("CompletingAllItems", (page) => {
            const checkboxes = page.querySelectorAll(".toggle");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep("DeletingAllItems", (page) => {
            for (let i = 0; i < numberOfItemsToAdd; i++)
                page.querySelector(".destroy").click();
        }),
    ],
});

Suites.push({
    name: "Preact-TodoMVC",
    url: "todomvc/architecture-examples/preact/dist/index.html",
    async prepare(page) {
        const element = await page.waitForElement(".new-todo");
        element.focus();
    },
    tests: [
        new BenchmarkTestStep(`Adding${numberOfItemsToAdd}Items`, (page) => {
            const newTodo = page.querySelector(".new-todo");
            for (let i = 0; i < numberOfItemsToAdd; i++) {
                newTodo.setValue(`Something to do ${i}`);
                newTodo.enter("keydown");
            }
        }),
        new BenchmarkTestStep("CompletingAllItems", (page) => {
            const checkboxes = page.querySelectorAll(".toggle");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                checkboxes[i].click();
        }),
        new BenchmarkTestStep("DeletingItems", (page) => {
            const deleteButtons = page.querySelectorAll(".destroy");
            for (let i = 0; i < numberOfItemsToAdd; i++)
                deleteButtons[i].click();
        }),
    ],
});

Suites.push({
    name: "Editor-Monaco",
    url: "tentative/editors/dist/monaco.html",
    async prepare(page) {
        // I've really struggled to make this test deterministic.
        // The language worker seems to be making network requests in the
        // middle of test, and further it's not clear to me if there's a
        // good way to wait for syntax highlighting to complete. So
        // for now this test disables formatting entirely, focusing just
        // on the time to load "big" text and scroll to the bottom/top.
        // The other challenge is that the syntax highlighting is async
        // and the runner doesn't have a good way to ensure that we're actually
        // completing that (i.e. not penalizing browsers which actually get to
        // it).
        page.querySelector("#create").click();
        await page.waitForElement("#create[disabled]");
    },
    tests: [
        new BenchmarkTestStep("Big", (page) => {
            page.querySelector("#big").click();
            // Layout is forced in async time for benchmark-runner, so this shouldn't be needed
            page.querySelector("#layout").click();
        }),
        new BenchmarkTestStep("Scroll down", (page) => {
            page.querySelector("#scroll").click();
            page.querySelector("#layout").click();
        }),
        new BenchmarkTestStep("Scroll up", (page) => {
            page.querySelector("#scroll").click();
            page.querySelector("#layout").click();
        }),
    ],
});

Suites.push({
    name: "Editor-CodeMirror",
    url: "tentative/editors/dist/codemirror.html",
    async prepare(page) {
        page.querySelector("#create").click();
        await page.waitForElement("#create[disabled]");
    },
    tests: [
        new BenchmarkTestStep("Big", (page) => {
            page.querySelector("#big").click();
            page.querySelector("#layout").click();
        }),
        new BenchmarkTestStep("Unhighlight", (page) => {
            page.querySelector("#unhighlight").click();
            page.querySelector("#layout").click();
        }),
        new BenchmarkTestStep("Highlight", (page) => {
            page.querySelector("#highlight").click();
            page.querySelector("#layout").click();
        }),
        new BenchmarkTestStep("Scroll down", (page) => {
            page.querySelector("#scroll").click();
            page.querySelector("#layout").click();
        }),
        new BenchmarkTestStep("Scroll up", (page) => {
            page.querySelector("#scroll").click();
            page.querySelector("#layout").click();
        }),
    ],
});

Suites.push({
    name: "Editor-TipTap",
    url: "tentative/editors/dist/tiptap.html",
    async prepare(page) {
        page.querySelector("#create").click();
        await page.waitForElement("#create[disabled]");
        page.querySelector("#small").click();
        page.querySelector("#layout").click();
    },
    tests: [
        new BenchmarkTestStep("Big", (page) => {
            page.querySelector("#big").click();
            page.querySelector("#layout").click();
        }),
        new BenchmarkTestStep("Unhighlight", (page) => {
            page.querySelector("#unhighlight").click();
            page.querySelector("#layout").click();
        }),
        new BenchmarkTestStep("Highlight", (page) => {
            page.querySelector("#highlight").click();
            page.querySelector("#layout").click();
        }),
        new BenchmarkTestStep("Scroll down", (page) => {
            page.querySelector("#scroll").click();
            page.querySelector("#layout").click();
        }),
        new BenchmarkTestStep("Scroll up", (page) => {
            page.querySelector("#scroll").click();
            page.querySelector("#layout").click();
        }),
    ],
});

Suites.push({
    name: "React-Stockcharts",
    url: "tentative/react-stockcharts/build/index.html?type=hybrid",
    async prepare(page) {
        await page.waitForElement("#render");
    },
    tests: [
        new BenchmarkTestStep("Render", (page) => {
            page.getElementById("render").click();
        }),
        new BenchmarkTestStep("PanTheChart", (page) => {
            const cursor = page.querySelector(".react-stockcharts-crosshair-cursor");
            let x = 150;
            let y = 200;
            const coords = (i) => ({ clientX: x + i * 10, clientY: y + i * 2, bubbles: true, cancelable: true });
            for (let i = 0; i < 100; ) {
                cursor.dispatchEvent("mousedown", coords(i), MouseEvent);
                for (let j = 10; j--; )
                    cursor.dispatchEvent("mousemove", coords(++i), MouseEvent);
                cursor.dispatchEvent("mouseup", coords(i), MouseEvent);
            }
        }),
        new BenchmarkTestStep("ZoomTheChart", (page) => {
            const cursor = page.querySelector(".react-stockcharts-crosshair-cursor");
            let event = {
                clientX: 200,
                clientY: 200,
                deltaMode: 0,
                delta: -10,
                deltaY: -10,
                bubbles: true,
                cancelable: true,
            };
            for (let i = 0; i < 30; i++)
                cursor.dispatchEvent("wheel", event, WheelEvent);

            event = {
                clientX: 650,
                clientY: 200,
                deltaMode: 0,
                delta: 10,
                deltaY: 10,
                bubbles: true,
                cancelable: true,
            };
            for (let i = 0; i < 10; i++)
                cursor.dispatchEvent("wheel", event, WheelEvent);

            event = {
                clientX: 200,
                clientY: 200,
                deltaMode: 0,
                delta: -10,
                deltaY: -10,
                bubbles: true,
                cancelable: true,
            };
            for (let i = 0; i < 10; i++)
                cursor.dispatchEvent("wheel", event, WheelEvent);
        }),
    ],
});

Suites.push({
    name: "React-Stockcharts-SVG",
    url: "tentative/react-stockcharts/build/index.html?type=svg",
    async prepare(page) {
        await page.waitForElement("#render");
    },
    tests: [
        new BenchmarkTestStep("Render", (page) => {
            page.getElementById("render").click();
        }),
        new BenchmarkTestStep("PanTheChart", (page) => {
            const cursor = page.querySelector(".react-stockcharts-crosshair-cursor");
            let x = 150;
            let y = 200;
            const coords = (i) => ({ clientX: x + i * 10, clientY: y + i * 2, bubbles: true, cancelable: true });
            for (let i = 0; i < 100; ) {
                cursor.dispatchEvent("mousedown", coords(i), MouseEvent);
                for (let j = 10; j--; )
                    cursor.dispatchEvent("mousemove", coords(++i), MouseEvent);
                cursor.dispatchEvent("mouseup", coords(i), MouseEvent);
            }
        }),
        new BenchmarkTestStep("ZoomTheChart", (page) => {
            const cursor = page.querySelector(".react-stockcharts-crosshair-cursor");
            let event = {
                clientX: 200,
                clientY: 200,
                deltaMode: 0,
                delta: -10,
                deltaY: -10,
                bubbles: true,
                cancelable: true,
            };
            for (let i = 0; i < 30; i++)
                cursor.dispatchEvent("wheel", event, WheelEvent);

            event = {
                clientX: 650,
                clientY: 200,
                deltaMode: 0,
                delta: 10,
                deltaY: 10,
                bubbles: true,
                cancelable: true,
            };
            for (let i = 0; i < 10; i++)
                cursor.dispatchEvent("wheel", event, WheelEvent);

            event = {
                clientX: 200,
                clientY: 200,
                deltaMode: 0,
                delta: -10,
                deltaY: -10,
                bubbles: true,
                cancelable: true,
            };
            for (let i = 0; i < 10; i++)
                cursor.dispatchEvent("wheel", event, WheelEvent);
        }),
    ],
});

Object.freeze(Suites);
globalThis.Suites = Suites;
