import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    TextInput,
    SafeAreaView,
} from "react-native"
import { Icon } from "@rneui/themed"
import React, { useEffect } from "react"
import BottomContainer from "../components/BottomContainer"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import comicActions from "../store/comics/actions"

const { getFavouriteComics } = comicActions

export default function Favourites({ navigation }) {
    const [text, setText] = React.useState("")
    const storeCategories = useSelector((state) => state.categories)
    const dispatch = useDispatch()

    const filterComics = () => {
        dispatch(
            getFavouriteComics({
                user_id: "63c5a72e3395adc7174cea60",
                limit: 4,
                title: text,
                category_id: storeCategories.activeCategory !== "all" ? storeCategories.activeCategory : "",
            })
        )
    }

    return (
        <SafeAreaView>
            <GestureHandlerRootView>
                <View style={styles.container}>
                    <ImageBackground
                        source={require("../assets/favouritesBg.png")}
                        style={styles.background}
                    >
                        <Text style={styles.headerText}>Favourites</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="search" size={30} color="#4338CA" />
                            <TextInput
                                onChangeText={(text) => setText(text)}
                                onSubmitEditing={filterComics}
                                style={styles.searchInput}
                                placeholder="Find your favourite manga"
                            />
                        </View>
                    </ImageBackground>
                    <BottomContainer />
                </View>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: 500,
    },
    background: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        resizeMode: "cover",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        margin: 20,
        paddingTop: 100,
    },
    inputContainer: {
        backgroundColor: "white",
        borderRadius: 40,
        padding: 10,
        margin: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    searchInput: {
        width: 300,
        height: 60,
        borderRadius: 40,
        padding: 15,
        fontSize: 20,
    },
})
