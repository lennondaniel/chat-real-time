import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  const env = {...process.env, ...loadEnv(mode, process.cwd())};
  return {
    envDir: '../.env',
    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
      },
      host: env.VITE_APP_HOST,
      port: parseInt(env.VITE_APP_PORT),
    },
  }
})
