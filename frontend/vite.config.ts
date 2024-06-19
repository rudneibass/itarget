import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteSassPlugin from 'vite-plugin-sass';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
      react(),
      ViteSassPlugin({ modules: true }),
      tsconfigPaths()
    ], 
})
