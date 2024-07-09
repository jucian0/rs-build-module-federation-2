import { useEffect } from "react";
import { Outlet, matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { router } from "./routes";

function useCurrentPathname() {
	const location = useLocation();
	return location.pathname
}

function useRemoteNavigationManager(appName: string, hostName: string) {
	const navigate = useNavigate();
	const pathname = useCurrentPathname();

	useEffect(() => {
		function eventListener(event: any) {
			const eventPathname = (event as CustomEvent<string>).detail;
			if (pathname === eventPathname || !matchRoutes(router.routes, { pathname })) {
				return;
			}
			navigate(event.detail);
		}

		window.addEventListener(`[${hostName}] - navigated`, eventListener);
		return () => {
			window.removeEventListener(`[${hostName}] - navigated`, eventListener);
		};
	}, [hostName, pathname]);

	useEffect(() => {
		window.dispatchEvent(
			new CustomEvent(`[${appName}] - navigated`, {
				detail: pathname,
			})
		);
	}, [pathname])
}


export function Layout() {

	useRemoteNavigationManager('remote', 'shell');
	console.log('Layout rendered remote >>>>>>>');

	return (
		<div>
			<span>Remote</span>
			<Outlet />
		</div>
	)
}

