import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		copy({
			targets: [
				{
					src: 'node_modules/pspdfkit/dist/pspdfkit-lib',
					dest: 'public/',
				},
			],
			hook: 'buildStart',
		}),
		EnvironmentPlugin('all'),
		react(),
	],
});
