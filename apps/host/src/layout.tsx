import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function useDispatcherNavigationEvent(appName: string, remoteBasename: string) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.startsWith(remoteBasename)) {
      window.dispatchEvent(
        new CustomEvent(`[${appName}] - navigated`, {
          detail: location.pathname.replace(remoteBasename, ""),
        })
      );
    }
  }, [location, remoteBasename, appName]);

  useEffect(() => {
    const remoteNavigationEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const newPathname = `${remoteBasename}${pathname}`;
      if (newPathname === location.pathname) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener(`[${remoteBasename}] - navigated`, remoteNavigationEventHandler);

    return () => {
      window.removeEventListener(
        `[${remoteBasename}] - navigated`,
        remoteNavigationEventHandler
      );
    };
  }, [location]);
}


export function Layout() {

  useDispatcherNavigationEvent('shell', '/remote');
  useDispatcherNavigationEvent('shell', '/cart');

  return (
    <div style={{ display: 'flex', gap: 10, flexDirection: "column" }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/remote/apps">From Host to Remote/App</Link>
        <Link to="/remote/tokens">From Host to Remote/Tokens</Link>
        <Link to="/cart/item">From Host to Cart/item</Link>
        <Link to="/cart/list">From Host to Cart/List</Link>
      </div>
      <Outlet />
    </div>
  );
}