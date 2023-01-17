/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import typescript from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
// import { terser } from "rollup-plugin-terser";
import OMT from "@surma/rollup-plugin-off-main-thread";
import entrypointHashmanifest from "rollup-plugin-entrypoint-hashmanifest";
import postcss from "rollup-plugin-postcss";
import cssModuleTypes from "./css-module-types.js";

// Delete 'dist'
require("rimraf").sync("dist");

export default {
  input: "src/bootstrap.ts",
  output: {
    dir: "dist",
    format: "amd",
    // amd: {
    //   autoId: true,
    //   basePath: 'http://localhost:9999/resources/benchmarks/proxx-tables/dist/'
    // },
    sourcemap: true,
    entryFileNames: "[name]-[hash].js",
    chunkFileNames: "[name]-[hash].js"
  },
  plugins: [
    cssModuleTypes("src"),
    postcss({
      minimize: true,
      modules: {
        generateScopedName: "[hash:base64:5]"
      },
      //extract: true,
      namedExports(name) {
        return name.replace(/-\w/g, val => val.slice(1).toUpperCase());
      }
    }),
    typescript({
      // Make sure we are using our version of TypeScript.
      typescript: require("typescript"),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true
        }
      },
      // We need to set this so we can use async functions in our
      // plugin code. :shurg:
      // https://github.com/ezolenko/rollup-plugin-typescript2/issues/105
      clean: true
    }),
    nodeResolve(),
    cjs(),
    {
      // Bugfix for Strict Mode breakage:
      // https://github.com/AndreasMadsen/xorshift/pull/14
      name: 'fix-xorshift',
      transform(code, id) {
        if (id.endsWith('xorshift.js')) {
          return { code: code + '\nvar resU, resL;', map: null };
        }
      }
    },
    OMT({
      // `prependLoader` will be called for every chunk. If it returns `true`,
      // the loader code will be prepended.
      prependLoader: (chunk, inputs) => {
        // If the filename ends with `worker`, prepend the loader.
        if (
          Object.keys(chunk.modules).some(mod => /worker\.[jt]s$/.test(mod))
        ) {
          return true;
        }
        // If not, fall back to the default behavior.
        return chunk.isEntry || inputs.includes(chunk.facadeModuleId);
      }
    }),
    // terser(),
    entrypointHashmanifest()
  ]
};
