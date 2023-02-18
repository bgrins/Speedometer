
import {editor as monacoEditor, languages} from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

let tsWorkerInstance = new tsWorker();
self.MonacoEnvironment = {
  globalAPI: true,
  getWorker(_, label) {
    console.log("getWorker", _, label);
    if (label === "typescript" || label === "javascript") {
      // return new tsWorker();
      return tsWorkerInstance;
    }
    return new editorWorker();
  },
};

export default function (element, value) {
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
      await languages.typescript.getJavaScriptWorker();
      editor.focus();
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
      editor.render(true);
    },
    setValue(value) {
      editor.setValue(value);
      // Force a render. Todo - do other editors expose this? should this be a separate function?
      editor.render(true);
    },
    format(on) {
      monacoEditor.setModelLanguage(editor.getModel(), on ? "javascript" : "plaintext");
      editor.setValue(editor.getValue());
      // Force a render. Todo - do other editors expose this? should this be a separate function?
      editor.render(true);
    },
  };
}
