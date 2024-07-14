import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div style={{ display: 'flex', gap: 10, flexDirection: "column" }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/remote">Remote</Link>
      </div>
      <Outlet />
    </div>
  );
}