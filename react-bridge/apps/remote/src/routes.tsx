import { createBrowserRouter } from "react-router-dom";
import { Tokens } from "./pages/tokens";
import { Apps } from "./pages/apps";
import { Layout } from "./layout";
import { Home } from "./pages/home";

export const router = createBrowserRouter([
	{
		path: "remote",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "tokens",
				element: <Tokens />,
			},
			{
				path: "apps",
				element: <Apps />,
			},
		],
	},
	{
		path: "*",
		element: <>Remote 404</>
	}
], {
	basename: "/remote",
});
