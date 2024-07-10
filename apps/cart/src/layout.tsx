import { useEffect } from "react";
import { Outlet, matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { router } from "./routes";

type NavigationDetails = {
	pathname: string;
	operation: "push" | "replace";
};
type NavigationEvent = CustomEvent<NavigationDetails>;

function useRemoteNavigationManager(appName: string, hostName: string) {
	const navigate = useNavigate();
	const pathname = useLocation().pathname;

	useEffect(() => {
		function eventListener(event: NavigationEvent) {
			const eventPathname = event.detail.pathname
			if (pathname === eventPathname || !matchRoutes(router.routes, { pathname: eventPathname })) {
				return;
			}
			navigate(event.detail);
		}
		window.addEventListener(`[${hostName}] - navigated`, eventListener as EventListener);
		return () => {
			window.removeEventListener(`[${hostName}] - navigated`, eventListener as EventListener);
		};
	}, [hostName, pathname]);

	useEffect(() => {
		window.dispatchEvent(
			new CustomEvent(`[${appName}] - navigated`, {
				detail: {
					pathname: pathname,
					operation: "push" as const
				},
			})
		);
	}, [pathname])
}


export function Layout() {

	useRemoteNavigationManager('cart', 'shell');

	return (
		<div>
			<span>Cart</span>
			<Outlet />
		</div>
	)
}

