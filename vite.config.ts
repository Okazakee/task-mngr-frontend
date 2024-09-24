import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import checker from 'vite-plugin-checker';
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig(({ mode }) => {
  // Load environment variables from the parent directory's `.env.local` file
  const env = loadEnv(mode, path.resolve(__dirname, '../'));

  return {
    plugins: [
      TanStackRouterVite(),
      viteReact(),
      checker({ typescript: true })
    ],
    define: {
      'process.env': env, // Make the env variables available to the project
    },
  };
});