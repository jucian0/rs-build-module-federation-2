import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
	return (
		<RouterProvider router={router} />
	)
};

import { createBridgeComponent } from '@module-federation/bridge-react';

export default createBridgeComponent({
	rootComponent: App
});