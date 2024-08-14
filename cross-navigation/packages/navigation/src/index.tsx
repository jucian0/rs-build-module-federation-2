import { useEffect } from "react";
import { matchRoutes, useLocation, useNavigate, } from "react-router-dom";

type NavigationDetails = {
  pathname: string;
  operation: "push" | "replace";
};
type NavigationEvent = CustomEvent<NavigationDetails>;

/**
 * Host Navigation Manager
 * @param appName 
 * @param remoteBasename 
 */
export function useDispatcherNavigationEvent(appName: string, remoteBasename: string) {
  const location = useLocation();
  const navigate = useNavigate();
  console.log('started', new Date().toTimeString());

  useEffect(() => {
    if (location.pathname.startsWith(remoteBasename)) {
      window.dispatchEvent(
        new CustomEvent<NavigationDetails>(`[${appName}] - navigated`, {
          detail: {
            pathname: location.pathname.replace(remoteBasename, ""),
            operation: "push" as const,
          },
        })
      );
    }
    console.log('finished', new Date().toTimeString());
  }, [location, remoteBasename, appName]);

  useEffect(() => {
    const remoteNavigationEventHandler = (event: NavigationEvent) => {
      const newPathname = `${remoteBasename}${event.detail.pathname}`;
      console.log({ newPathname });
      if (newPathname === location.pathname) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener(`[${remoteBasename}] - navigated`, remoteNavigationEventHandler as EventListener);
    return () => {
      window.removeEventListener(`[${remoteBasename}] - navigated`, remoteNavigationEventHandler as EventListener);
    };
  }, [location]);
}



/**
 * Remote Navigation Manager
 * @param appName 
 * @param hostName 
 * @param routes 
 */
export function useRemoteNavigationManager(appName: string, hostName: string, routes: any) {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;


  useEffect(() => {
    function eventListener(event: NavigationEvent) {
      const eventPathname = event.detail.pathname
      if (pathname === eventPathname || !matchRoutes(routes, { pathname: eventPathname })) {
        return
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
