import { AppRegistry } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import App from "./src/App";
import { version, name as appName } from "./package.json";

console.warn(`** ${appName} version ${version}`);

const TheApp = App;

AppRegistry.registerComponent(appName, () => TheApp);

export default TheApp;
