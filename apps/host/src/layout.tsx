import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div style={{ display: 'flex', gap: 10, flexDirection: "column" }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/remote/apps">From Host to Remote/App</Link>
        <Link to="/remote/tokens">From Host to Remote Tokens</Link>
      </div>
      <Outlet />
    </div>
  );
}