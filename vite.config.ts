import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables from the parent directory's `.env.local` file
  const env = loadEnv(mode, path.resolve(__dirname, '../'));

  return {
    plugins: [react()],
    define: {
      'process.env': env, // Make the env variables available to the project
    },
  };
});