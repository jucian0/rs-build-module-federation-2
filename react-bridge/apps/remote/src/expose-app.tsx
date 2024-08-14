import { createBridgeComponent } from "@module-federation/bridge-react";
import App from "./app";

export default createBridgeComponent({
  rootComponent: App
});