import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vscode from "@tomjs/vite-plugin-vscode";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    vscode({
      extension: {
        sourcemap: "inline",
      },
    }),
  ],
});
