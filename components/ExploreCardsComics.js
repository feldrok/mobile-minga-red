import {
    Text,
    StyleSheet,
    ImageBackground,
} from "react-native"
import React from "react"

export default function ExploreCardsComics() {
    return (
        <>
            <ImageBackground
                style={styles.container}
                imageStyle={{ borderRadius: 20 }}
                source={require("../assets/explore-1.png")}
            >
                <Text style={styles.hashtag}>
                    Adventure
                </Text>
            </ImageBackground>
            <ImageBackground
                style={styles.container}
                imageStyle={{ borderRadius: 20 }}
                source={require("../assets/explore-2.png")}
            >
                <Text style={styles.hashtag}>
                    Nostalgic
                </Text>
            </ImageBackground>
            <ImageBackground
                style={styles.container}
                imageStyle={{ borderRadius: 20 }}
                source={require("../assets/explore-3.png")}
            >
                <Text style={styles.hashtag}>
                    Popular
                </Text>
            </ImageBackground>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 85,
        height: 65,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 5,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
    },
    icon: {
        width: 40,
        height: 40,
        position: "absolute",
        top: 10,
        left: 30,
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        padding: 5,
    },
    subtitle: {
        color: "white",
        fontSize: 15,
        padding: 5,
    },
    hashtag: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
})
