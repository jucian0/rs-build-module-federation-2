import { Outlet, createBrowserRouter } from "react-router-dom";
import { AccessTokens } from "./pages/access-tokens";
import { Apps } from "./pages/apps";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Outlet />,
		children: [
			{
				path: "access-tokens",
				element: <AccessTokens />,
			},
			{
				path: "apps",
				element: <Apps />,
			},
		],
	},
]);
