import {
    Text,
    StyleSheet,
    SectionList,
    ImageBackground,
    View,
    Image,
} from "react-native"
import React from "react"

export default function ExploreCards() {
    return (
        <ImageBackground
            style={styles.container}
            imageStyle={{ borderRadius: 20 }}
            source={require("../assets/explore-1.png")}
        >
            <Image
                style={styles.icon}
                source={require("../assets/exploreIcon.png")}
            />
            <Text style={styles.title}>For the love of comic</Text>
            <Text style={styles.subtitle}>
                Explore the best comics and mangas
            </Text>
            <Text style={styles.hashtag}>
                #MingaLove
            </Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 30,
        margin: 10,
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
        fontWeight: "medium",
        padding: 5,
    },
})
