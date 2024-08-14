import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import path from "node:path";


export default defineConfig({
	server: {
		port: 3002,
	},
	source: {
		alias: {
			react: path.resolve(__dirname, 'node_modules/react'),
			'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
			'react-router-dom$': path.resolve(
				__dirname,
				'node_modules/@module-federation/bridge-react/dist/router.es.js',
			),
		},
	},
	dev: {
		// It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
		assetPrefix: "http://localhost:3002",
	},
	tools: {
		rspack: (config, { appendPlugins }) => {
			// You need to set a unique value that is not equal to other applications
			config.output!.uniqueName = "cart";
			appendPlugins([
				new ModuleFederationPlugin({
					name: "cart",
					exposes: {
						"./app": "./src/expose-app.tsx",
					},
				}),
			]);
		},
	},
	plugins: [pluginReact()],
});
