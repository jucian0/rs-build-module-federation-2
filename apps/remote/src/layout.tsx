import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function useCurrentPathname() {
	const location = useLocation();
	return location.pathname.split('/')[location.pathname.split('/').length - 1].replace('/', '');
}

function useRemoteNavigationManager(appName: string, hostName: string) {
	const navigate = useNavigate();
	const pathname = useCurrentPathname();

	useEffect(() => {
		function eventListener(event: any) {
			const eventPathname = (event as CustomEvent<string>).detail;
			if (pathname === eventPathname) {
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

