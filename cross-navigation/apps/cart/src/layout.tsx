import { useEffect } from "react";
import { Link, Outlet, matchRoutes, useLocation, useNavigate } from "react-router-dom";
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
			<div style={{ display: 'flex', gap: 10 }}>
				<a href="/remote/apps">From Cart to Remote/App</a>
				<a href="/remote/tokens">From Cart to Remote/Tokens</a>
				<Link to="/item">From Cart to Cart/item</Link>
				<Link to="/list">From Cart to Cart/List</Link>
			</div>
			<Outlet />
		</div>
	)
}
