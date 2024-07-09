import { createBrowserRouter } from "react-router-dom";
import { Item } from "./pages/item";
import { List } from "./pages/list";
import { Layout } from "./layout";
import { Home } from "./pages/home";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "list",
				element: <List />,
			},
			{
				path: "item",
				element: <Item />,
			},
			{
				path: "*",
				element: <div>Not Found</div>,
			}
		],
	},
], {
});
