import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-redux"
import store from "./store/store"
import DrawerNavigation from "./navigation/DrawerNavigation"
import React from "react"

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                    <DrawerNavigation />
            </NavigationContainer>
        </Provider>
    )
}
