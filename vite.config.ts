import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import * as path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@':path.join(__dirname,'./src'),
    }
  },
  plugins: [
    vue({ reactivityTransform: true}),
    Components({
      resolvers: [VantResolver()],
    }),

  ]
})
