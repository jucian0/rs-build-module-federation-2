import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { Home } from "./pages/home";
import { List } from "./pages/list";
import { Item } from "./pages/item";

export default function App() {
	return (
		<>
			Root Cart
			<BrowserRouter basename="/cart">
				<Routes>
					<Route path="*" element={<Layout />}>
						<Route element={<Home />} index />
						<Route element={<List />} path="list" />
						<Route element={<Item />} path="item" />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
};