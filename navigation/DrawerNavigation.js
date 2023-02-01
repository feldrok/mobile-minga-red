import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Home from "../screens/Home"
import Favourites from "../screens/Favourites"
import Login from "../screens/Login"

const Drawer = createDrawerNavigator()

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Favourites" component={Favourites} />
            <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>
    )
}
