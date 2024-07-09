import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig({
	server: {
		port: 3000,
	},
	dev: {
		// It is necessary to configure assetPrefix, and in the production build, you need to configure output.assetPrefix
		assetPrefix: "http://localhost:3000",
	},
	tools: {
		rspack: (config, { appendPlugins }) => {
			// You need to set a unique value that is not equal to other applications
			config.output!.uniqueName = "consumers";
			appendPlugins([
				new ModuleFederationPlugin({
					name: "consumers",
					exposes: {
						"./app": "./src/app.tsx",
					},
					shared: ["react", "react-dom"],
				}),
			]);
		},
	},
	plugins: [pluginReact()],
});
