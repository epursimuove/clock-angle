import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import {devDependencies, name, version} from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({

  base: "",
  
  // Not working :(
  // define: {
  //   VITE_VUE_APP_NAME: JSON.stringify(name),
  //   VITE_VUE_APP_VERSION: JSON.stringify(version),
  //   VITE_TYPESCRIPT_VERSION: JSON.stringify("5.1.6"), //JSON.stringify(devDependencies.typescript + "--TODO--!!"),
  // },

  plugins: [
    vue(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }

});
