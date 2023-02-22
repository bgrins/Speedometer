


## Description

## Screenshot

## What are we testing

## How are we testing


Created with

```
npm create vite@latest editors
```

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

```
npm run dev
```

Building

```
npm run build
```

After that, the test can be loaded from within the project root using i.e. http://localhost:7000/InteractiveRunner.html?suite=Editor-Monaco or http://localhost:7000/resources/tentative/editors/dist/
