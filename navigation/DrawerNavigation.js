import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Home from "../screens/Home"
import Login from "../screens/Login"
import Comics from "../screens/Comics"
import NewRole from "../screens/NewRole"

const Drawer = createDrawerNavigator()

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Comics" component={Comics} />
            <Drawer.Screen name="New Role" component={NewRole} />
        </Drawer.Navigator>
    )
}
