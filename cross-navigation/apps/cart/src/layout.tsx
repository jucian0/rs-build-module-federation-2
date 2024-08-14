import { Link, Outlet } from "react-router-dom";
import { useRemoteNavigationManager } from "navigation/router";
import { router } from "./routes";


export function Layout() {

	useRemoteNavigationManager('cart', 'shell', router.routes);

	return (
		<div>
			<span>Cart</span>
			<div style={{ display: 'flex', gap: 10 }}>
				<Link to={{ pathname: 'remote/app' }}>From Cart to Remote/App</Link>
				<Link to="/remote/tokens">From Cart to Remote/Tokens</Link>
				<Link to="/item">From Cart to Cart/item</Link>
				<Link to="/list">From Cart to Cart/List</Link>
			</div>
			<Outlet />
		</div>
	)
}
