import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.webp"],
})

// export default defineConfig(({command, mode}) => {
//   const env = loadEnv(mode, process.cwd(), "VITE_");
//   console.log(env)
//   return {}
// })

// export default defineConfig({})

  
