import { Link, Outlet } from "react-router-dom";

export function Layout() {
	return (
		<div>
			<span>Remote</span>
			<div style={{ display: 'flex', gap: 10 }}>
				<Link to="/">Home</Link>
				<Link to="/apps">Apps</Link>
				<Link to="/tokens">Tokens</Link>
			</div>
			<Outlet />
		</div>
	)
}

