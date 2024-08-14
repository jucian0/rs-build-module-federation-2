import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import path from "node:path";


export default defineConfig({
	server: {
		port: 3000,
	},
	source: {
		alias: {
			react: path.resolve(__dirname, 'node_modules/react'),
			'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
			'react-router-dom': path.resolve(
				__dirname,
				'node_modules/react-router-dom',
			),
		},
	},
	tools: {
		rspack: (config, { appendPlugins }) => {
			appendPlugins([
				new ModuleFederationPlugin({
					name: "host",
					remotes: {
						remote: "remote@http://localhost:3001/mf-manifest.json",
						cart: "cart@http://localhost:3002/mf-manifest.json",
					},
					runtimePlugins: [require.resolve("./shared-strategy")]
				}),
			]);
		},
	},
	plugins: [pluginReact()],
});
