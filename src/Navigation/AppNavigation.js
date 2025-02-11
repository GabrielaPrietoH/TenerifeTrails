import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { screen } from "../utils";
import { TrailStack } from "./TrailStack";
import { FavoritesStack } from "./FavoritesStack";
import { RankingStack } from "./RankignStack";
import { SearchStack } from "./SearchStack";
import { AccountStack } from "./AccountStack";


const Tab = createBottomTabNavigator();

export function AppNavigation() {
    return(
        <Tab.Navigator screenOptions = {({route}) => ({
              headerShown: false,
              tabBarInactiveTintColor: "#004F92",
              tabBarActiveTintColor: "#646464",
              tabBarIcon: ({color, size}) => screenOptions(route, color, size)
            })}
        >
            <Tab.Screen name = {screen.trail.tab} component = {TrailStack} options={{title: "Senderos"}} />
            <Tab.Screen name = {screen.favorites.tab} component = {FavoritesStack}  options={{title: "Favoritos"}} />
            <Tab.Screen name = {screen.ranking.tab} component = {RankingStack}  options={{title: "Ranking"}} />
            <Tab.Screen name = {screen.search.tab} component = {SearchStack}  options={{title: "Buscar"}} />
            <Tab.Screen name = {screen.account.tab} component = {AccountStack}  options={{title: "Cuenta"}} />
        </Tab.Navigator>
    );
}

function screenOptions(route, color, size) {
    let iconName;
    switch(route.name) {
        case screen.trail.tab:
            iconName = "compass-outline";
            break;
        case screen.favorites.tab:
            iconName = "heart-outline";
            break;
        case screen.ranking.tab:
            iconName = "star-outline";
            break;
        case screen.search.tab:
            iconName = "magnify";
            break;
        case screen.account.tab:
            iconName = "home-outline";
            break;
        default:
            break;
    }
    return <Icon type = "material-community" name = {iconName} color={color} size={size} />;
}