import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import path from "node:path";


export default defineConfig({
	server: {
		port: 3001,
	},
	source: {
		alias: {
			react: path.resolve(__dirname, 'node_modules/react'),
			'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
		},
	},
	dev: {
		// It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
		assetPrefix: "http://localhost:3001",
	},
	tools: {
		rspack: (config, { appendPlugins }) => {
			// You need to set a unique value that is not equal to other applications
			config.output!.uniqueName = "remote";
			appendPlugins([
				new ModuleFederationPlugin({
					name: "remote",
					exposes: {
						"./app": "./src/expose-app.tsx",
					},
				}),
			]);
		},
	},
	plugins: [pluginReact()],
});
