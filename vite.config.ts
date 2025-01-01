import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), TanStackRouterVite()],
	server: {
		port: 3000
	},
	css: {
		devSourcemap: true
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	}
})
