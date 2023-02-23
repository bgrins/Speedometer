import loader from "@monaco-editor/loader";
// import * as monaco from 'monaco-editor';
// loader.config({monaco})

// In local development use the current directory to load monaco sources. Else go up one directory.
const path = location.pathname.includes("/dist/") ? "../monaco-editor-built/min/vs" : "./monaco-editor-built/min/vs";
loader.config({ paths: { vs: path } });
const loaderInit = loader.init();

export default async function (element, value) {
    let { editor: monacoEditor, languages } = await loaderInit;

    const languageWorkerReady = new Promise((resolve) => {
        languages.onLanguage("javascript", async () => {
            await languages.typescript.getJavaScriptWorker();
            resolve();
        });
    });

    let editor = monacoEditor.create(element, {
        value: value,
        language: "javascript",
        automaticLayout: true,
        wordWrap: "wordWrapColumn",
        wordWrapColumn: 80,
    });

    return {
        editor,
        ready: new Promise(async (resolve) => {
            await languageWorkerReady;
            // editor.focus();
            // Just debugging if network access can be prevented due to a timing issue 
            // in worker:
            await new Promise(r => setTimeout(r, 1000));
            resolve();
        }),
        getScrollHeight() {
            return editor.getScrollHeight();
        },
        getScrollTop() {
            return editor.getScrollTop();
        },
        setScrollTop(value) {
            editor.setScrollTop(value);
            // Force a render. Todo - do other editors expose this? should this be a separate function?
            // editor.render(true);
        },
        setValue(value) {
            editor.setValue(value);
            // Force a render. Todo - do other editors expose this? should this be a separate function?
            // editor.render(true);
        },
        format(on) {
            monacoEditor.setModelLanguage(editor.getModel(), on ? "javascript" : "plaintext");
            editor.setValue(editor.getValue());
            // Force a render. Todo - do other editors expose this? should this be a separate function?
            // editor.render(true);
        },
    };
}
