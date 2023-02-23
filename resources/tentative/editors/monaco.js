// import loader from "@monaco-editor/loader";
// // In local development use the current directory to load monaco sources. Else go up one directory.
// loader.config({ paths: { vs: path } });
// const loaderInit = loader.init();

require.config({ paths: { vs: EDITOR_PATH } });
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

self.MonacoEnvironment = {
    getWorkerUrl: () => workerUrl,
};

const workerUrl = URL.createObjectURL(
    new Blob(
        [
            `
    self.MonacoEnvironment = { baseUrl: ${JSON.stringify(new URL(location.pathname.includes("/dist/") ? "../monaco-editor-built/min" : "./monaco-editor-built/min", window.location))} };
    console.log("in worker");
    importScripts(self.MonacoEnvironment.baseUrl + '/vs/base/worker/workerMain.js');
`,
        ],
        { type: "text/javascript" }
    )
);

const loaderInit = new Promise((resolve) => {
    require(["vs/editor/editor.main"], function () {
        /** @type {import('monaco-editor')} */
        resolve(self.monaco);
    });
});

// This works for preventing network requests mid-test but requires module workers
// (only in Firefox Nightly).
// import * as monaco from "monaco-editor";
// const { editor: monacoEditor, languages } = monaco;
// import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
// import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
// let editorWorkerInstance = new editorWorker();
// let editorWorkerReady = new Promise((r) => {
//     editorWorkerInstance.addEventListener("message", r, { once: true });
// });
// let tsWorkerInstance = new tsWorker();
// let tsWorkerReady = new Promise((r) => {
//     tsWorkerInstance.addEventListener("message", r, { once: true });
// });
// self.MonacoEnvironment = {
//     globalAPI: true,
//     getWorker(_, label) {
//         if (label === "typescript" || label === "javascript") {
//             return tsWorkerInstance;
//         }
//         return editorWorkerInstance;
//     },
// };

export default async function (element, value) {
    let { editor: monacoEditor, languages } = await loaderInit;
    
    let editor = monacoEditor.create(element, {
        value: value,
        // language: "javascript",
        language: "plaintext",
        automaticLayout: true,
        wordWrap: "wordWrapColumn",
        wordWrapColumn: 80,
    });

    return {
        editor,
        ready: Promise.resolve(),
        // ready: new Promise((resolve) => {
        //     // https://github.com/microsoft/monaco-editor/issues/115
        //     // This prevents network access in the middle of the test
        //     // by delaying until the ts worker is loaded. I believe, but am
        //     // not positive, that this will always be after the main editorWorker
        //     editor.onDidChangeModelLanguageConfiguration(resolve);
        // }),
        // ready: Promise.resolve(),
        // ready: new Promise(async (resolve) => {
        //     await languageWorkerReady;
        //     // editor.focus();
        //     // Just debugging if network access can be prevented due to a timing issue
        //     // in worker:
        //     // await new Promise(r => setTimeout(r, 1000));
        //     resolve();
        // }),
        getScrollHeight() {
            return editor.getScrollHeight();
        },
        getScrollTop() {
            return editor.getScrollTop();
        },
        setScrollTop(value) {
            editor.setScrollTop(value);
            // Force a render. Todo - do other editors expose this? should this be a separate function?
            editor.render(true);
        },
        setValue(value) {
            editor.setValue(value);
            // Force a render. Todo - do other editors expose this? should this be a separate function?
            editor.render(true);
        },
        format(on) {
            monacoEditor.setModelLanguage(editor.getModel(), on ? "javascript" : "plaintext");
            // Force a render. Todo - do other editors expose this? should this be a separate function?
            editor.render(true);
        },
    };
}
