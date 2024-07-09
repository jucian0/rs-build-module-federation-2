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
			console.log('remote pathname --->', eventPathname, matchRoutes(router.routes, { pathname: eventPathname }));
			if (pathname === eventPathname || !matchRoutes(router.routes, { pathname: eventPathname })) {
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
	return (
		<div>
			<span>Remote</span>
			<Outlet />
		</div>
	)
}

