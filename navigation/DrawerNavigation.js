import React, { useCallback, useEffect } from "react"
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer"
import Home from "../screens/Home"
import Favourites from "../screens/Favourites"
import Login from "../screens/Login"
import { useDispatch, useSelector } from "react-redux"
import userActions from "../store/user/actions"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import { Image } from "react-native"

const { signInToken, signOut } = userActions

const Drawer = createDrawerNavigator()

export default function DrawerNavigation() {
    const [isLogged, setIsLogged] = React.useState(false)
    const storeUser = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const checkToken = async () => {
        try {
            if (storeUser.isAuthenticated === true) {
                setIsLogged(true)
            } else {
                setIsLogged(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            checkToken()
        }, [storeUser])
    )

    const handleSignOut = async () => {
        try {
            dispatch(signOut())
            await AsyncStorage.removeItem("token")
            await AsyncStorage.removeItem("user")
        } catch (error) {
            console.log(error)
        }
    }

    const CustomDrawerContent = (props) => {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                {isLogged ? (
                    <DrawerItem label="Logout" onPress={handleSignOut} />
                ) : null}
            </DrawerContentScrollView>
        )
    }

    const renderLoginNav = () => {
        if (isLogged === true) {
            return (
                <>
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="Favourites" component={Favourites} />
                </>
            )
        } else {
            return (
                <>
                    <Drawer.Screen
                        name="Login"
                        component={Login}
                    />
                </>
            )
        }
    }

    return (
        <Drawer.Navigator
            initialRouteName="Login"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#4338CA",
                },
                headerTintColor: "#fff",
                headerRightContainerStyle: {
                    marginRight: 10,
                },
                headerRight: () => (
                    <Image source={require("../assets/logo.png")} />
                ),
                drawerIcon: () => null,
            }}
        >
            {renderLoginNav()}
        </Drawer.Navigator>
    )
}
