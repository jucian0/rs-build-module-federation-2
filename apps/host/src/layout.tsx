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
    const app1NavigationEventHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;
      const newPathname = `${remoteBasename}${pathname}`;
      if (newPathname === location.pathname) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener(`[${remoteBasename}] - navigated`, app1NavigationEventHandler);

    return () => {
      window.removeEventListener(
        `[${remoteBasename}] - navigated`,
        app1NavigationEventHandler
      );
    };
  }, [location]);
}


export function Layout() {

  useDispatcherNavigationEvent('shell', '/remote');

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