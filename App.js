import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"
import Favourites from "./screens/Favourites"
import Home from "./screens/Home"
import Login from "./screens/Login"
import store from "./store/store"

const Drawer = createDrawerNavigator()

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="Favourites" component={Favourites} />
                    <Drawer.Screen name="Login" component={Login} />
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>
    )
}
