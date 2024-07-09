import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig({
	server: {
		port: 2000,
	},
	tools: {
		rspack: (config, { appendPlugins }) => {
			appendPlugins([
				new ModuleFederationPlugin({
					name: "host",
					remotes: {
						remote: "remote@http://localhost:3000/mf-manifest.json",
					},
					shared: ["react", "react-dom"],
				}),
			]);
		},
	},
	plugins: [pluginReact()],
});
