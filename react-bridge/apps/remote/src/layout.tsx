import { Link, Outlet } from "react-router-dom";

export function Layout() {
	return (
		<div>
			<span>Remote</span>
			<div style={{ display: 'flex', gap: 10 }}>
				<Link to="/cart/item">From Remote to Cart/App</Link>
				<Link to="/cart/list">From Remote to Cart/Tokens</Link>
				<Link to="/app">From Remote to Remote/app</Link>
				<Link to="/tokens">From Remote to Remote/Tokens</Link>
			</div>
			<Outlet />
		</div>
	)
}