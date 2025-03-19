import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { Home } from "./pages/home";
import { Tokens } from "./pages/tokens";
import { Apps } from "./pages/apps";

export default function App() {
	return (
		<>
			Root Remote
			<BrowserRouter basename="/remote">
				<Routes>
					<Route path="*" element={<Layout />}>
						<Route element={<Home />} index />
						<Route element={<Tokens />} path="tokens" />
						<Route element={<Apps />} path="apps" />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
};
