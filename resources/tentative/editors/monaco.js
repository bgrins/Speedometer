
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

// Todo - these add quite a bit to the build size. Remove if we decide to only use one
// language for syntax highlight.
// import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
// import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
// import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";

self.MonacoEnvironment = {
  globalAPI: true,
  getWorker(_, label) {
    // if (label === "json") {
    //   return new jsonWorker();
    // }
    // if (label === "css" || label === "scss" || label === "less") {
    //   return new cssWorker();
    // }
    // if (label === "html" || label === "handlebars" || label === "razor") {
    //   return new htmlWorker();
    // }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

export default function (element, value) {
  let editor = monaco.editor.create(element, {
    value: value,
    language: "plaintext",
    automaticLayout: true,

    wordWrap: "wordWrapColumn",
    wordWrapColumn: 80,
  });
  return {
    editor,
    setValue(value) {
      editor.setValue(value);
      // Force a render. Todo - do other editors expose this? should this be a separate function?
      editor.render();
    },
    format(on) {
      monaco.editor.setModelLanguage(editor.getModel(), on ? "javascript" : "plaintext");
      // Force a render. Todo - do other editors expose this? should this be a separate function?
      editor.render();
    },
  };
}
