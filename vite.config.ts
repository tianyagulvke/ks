import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    //全局配置scss
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/style/main.scss";`,
      },
    },
  },
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/answer': {
        target: 'http://10.6.250.68:8765', //"http://10.9.40.16:30200", ////  "http://10.6.250.115:8765", // ,
        changeOrigin: true,
      },
      '/survey': {
        target: 'http://10.6.250.68:8765', //"http://10.9.40.16:30200", ////  "http://10.6.250.115:8765", // ,
        changeOrigin: true,
      },
    },
  },
  // 配置路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
