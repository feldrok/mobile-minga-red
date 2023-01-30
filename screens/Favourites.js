import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native"
import { Icon } from "@rneui/themed"
import React from "react"
import CategoryFilters from "../components/CategoryFilters"
import ComicCard from "../components/ComicCard"

const comics = [
    {
        id: 1,
        title: "Naruto",
        category: "Seinen",
        image: require("../assets/comic1.png"),
    },
    {
        id: 2,
        title: "My Hero Academia",
        category: "Shonen",
        image: require("../assets/comic2.png"),
    },
    {
        id: 3,
        title: "Jujutsu Kaisen",
        category: "Shojo",
        image: require("../assets/comic3.png"),
    }
]

export default function Favourites() {
    return (
        <>
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/favouritesBg.png")}
                    style={styles.background}
                >
                    <Text style={styles.headerText}>Favourites</Text>
                    <View style={styles.inputContainer}>
                        <Icon name="search" size={30} color="#4338CA" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Find your favourite manga"
                        />
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.buttonsContainer}>
                    <CategoryFilters />
                    <TouchableOpacity style={styles.filterButton}>
                        <Icon name="sort" size={30} color="#4338CA" />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {
                        comics.map((comic) => (
                            <ComicCard
                                key={comic.id}
                                title={comic.title}
                                category={comic.category}
                                image={comic.image}
                            />
                        ))
                    }
                </ScrollView>
            </View>
        </>
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
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        margin: 20,
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
    bottomContainer: {
        backgroundColor: "#EBEBEB",
        alignItems: "center",
        width: "100%",
        height: 600,
        position: "absolute",
        top: 400,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    filterButton: {
        width: "20%",
        position: "absolute",
        right: 0,
    },
})
