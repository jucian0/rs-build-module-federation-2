import { useRemoteNavigationManager } from "navigation/router";
import { Outlet } from "react-router-dom";
import { router } from "./routes";


export function Layout() {

	useRemoteNavigationManager('remote', 'shell', router.routes);
	return (
		<div>
			<span>Remote</span>
			<Outlet />
		</div>
	)
}

