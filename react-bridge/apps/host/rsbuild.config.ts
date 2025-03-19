import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [pluginReact(), pluginModuleFederation({
		name: 'host',
		remotes: {
			remote: "remote@http://localhost:3001/mf-manifest.json",
			cart: "cart@http://localhost:3002/mf-manifest.json",
		},
		shared: ['react', 'react-dom'],
	})],
});
