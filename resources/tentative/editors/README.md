
## Description
Lots of people edit text content in the browser. Lots of that content, like WYSIWYG content or code, is too rich or complex to represent well with a `<textarea>`. Sites typically rely on advanced editor libraries for this, and we should make sure browsers perform well common patterns used by them. 

## Screenshot
TODO

## What are we testing
- 
- Stress-test DOM manipulations of a repeated action.
- Impact of JavaScript version releases and their language features.
Tools (bundlers & transpilers) for build optimizations.
Libraries & frameworks for render strategies and architectural patterns

## How are we testing

The test simulates a real-world user flow by loading a number of popular editor libraries. After the initial load is complete, the following steps are timed:

- Setting to a fairly large value
- "Formatting" the text - in code editors this means turning on syntax highlighting, and in WYSISWYG this means bolding all of the contents
- Scrolling to the bottom of the editor

While it would be nice to include the overall initialization time in the measurements, certain editors like Monaco create network requests or other asynchronous operations which make the measurement less deterministic. This decision may be revisited if we come up with a good way to do it.

## Developer Documentation

The app was created with

```
npm create vite@latest editors
```

And can be previewed with `npm run dev`. In order to run in the harness you must use `npm run build` which will recreate the `dist/` directory.

The test can be loaded from within the project root using i.e. http://localhost:7000/?suite=Editor-CodeMirror&startAutomatically=true or http://localhost:7000/resources/tentative/editors/dist/


### Notes about Monaco

Todo

```
mkdir monaco-editor-built
cp -R node_modules/monaco-editor/min monaco-editor-built/min

# Todo do we care about these? It adds 13MB to the repo in order to avoid source map errors
cp -R node_modules/monaco-editor/min-maps monaco-editor-built/min-maps

# Remove some unused files
rm -r monaco-editor-built/min/vs/language/html monaco-editor-built/min/vs/language/css monaco-editor-built/min/vs/language/json

```

Todo - There may be an oppurtunity to remove some more files from `monaco-editor-built/**/*.nls.*`
Developing
