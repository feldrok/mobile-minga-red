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
import React, { useCallback, useEffect } from "react"
import BottomContainerComics from "../components/BottomContainerComics"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import comicActions from "../store/comics/actions"
import { useFocusEffect } from "@react-navigation/native"
import categoryActions from "../store/categories/actions"

const { getComics } = comicActions
const { getCategories } = categoryActions

export default function Comics() {
    const [text, setText] = React.useState("")
    const storeCategories = useSelector((store) => store.categories)
    const storeComics = useSelector((store) => store.comics)
    const dispatch = useDispatch()

    const filterComics = () => {
        dispatch(getComics({
            limit: 10,
            title: text,
            category_id: storeCategories.activeCategory !== "all" ? storeCategories.activeCategory : "",
        }))
    }
    return (
        <SafeAreaView>
            <GestureHandlerRootView>
                <View style={styles.container}>
                    <ImageBackground
                        source={require("../assets/comicsbg.png")}
                        style={styles.background}
                    >
                        <Text style={styles.headerText}>Comics</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="search" size={30} color="#4338CA" />
                            <TextInput
                                onChangeText={(text) => setText(text)}
                                onSubmitEditing={filterComics}
                                style={styles.searchInput}
                                placeholder="Find your comics here"
                            />
                        </View>
                    </ImageBackground>
                    <BottomContainerComics />
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
        paddingTop: 90,
    },
    inputContainer: {
        backgroundColor: "white",
        borderRadius: 40,
        padding: 5,
        margin: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    searchInput: {
        width: 300,
        height: 40,
        borderRadius: 40,
        padding: 10,
        fontSize: 20,
    },
})
