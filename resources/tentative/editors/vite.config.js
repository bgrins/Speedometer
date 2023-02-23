import { resolve } from "path";
import { defineConfig } from "vite";
import fs from "fs";
export default defineConfig({
    base: "./", // Since this will be loaded from the project root
    build: {
        rollupOptions: {
            plugins: [
                {
                    name: "closeBundle",
                    closeBundle() {
                        // Because monaco has scripts relative to the root directory, but it gets published
                        // to dist/ we need to replace the path to move up one directory.
                        let file = "./dist/monaco.html";
                        let str = fs.readFileSync(file, "utf8");
                        var result = str.replace(/src=\"\/monaco-editor-built\//g, 'src="../monaco-editor-built/');
                        fs.writeFileSync(file, result, "utf8");
                        console.log("closeBundle");
                    },
                },
            ],
            input: {
                codemirror: resolve(__dirname, "codemirror.html"),
                main: resolve(__dirname, "index.html"),
                monaco: resolve(__dirname, "monaco.html"),
                tiptap: resolve(__dirname, "tiptap.html"),
            },
        },
    },
});
