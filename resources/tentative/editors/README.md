
Created with

```
npm create vite@latest editors
```

```
mkdir monaco-editor-built
cp -R node_modules/monaco-editor/min monaco-editor-built/min
cp -R node_modules/monaco-editor/min-maps monaco-editor-built/min-maps
```

Developing

```
npm run dev
```

Building

```
npm run build
```

After that, the test can be loaded from within the project root using i.e. http://localhost:7000/InteractiveRunner.html?suite=Editor-Monaco or http://localhost:7000/resources/tentative/editors/dist/

