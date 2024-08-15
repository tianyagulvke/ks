import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    //全局配置scss
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/style/main.scss";`
      }
    }
  },
  plugins: [react()],
  // 配置路径别名
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    }
  }
})
