import Home from "@views/home";
import StationInfo from "@views/stationInfo";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";


const Router = createAppContainer(createStackNavigator({
    Home,
    StationInfo
}, {
    initialRouteName: "Home",
}));

export default Router;