import Home from "@views/home";
import StationInfo from "@views/stationInfo";
import { createAppContainer } from "react-navigation";
// @ts-ignore
import { createStackNavigator } from "react-navigation-stack";


const Router = createAppContainer(createStackNavigator({
    Home,
    StationInfo
}, {
    headerMode: "none",
    initialRouteName: "Home",
}));

export default Router;