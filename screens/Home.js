import {
    StyleSheet,
    Text,
    ImageBackground,
    Pressable,
    View,
    ScrollView,
    Dimensions,
} from "react-native"
import React from "react"
import ExploreCards from "../components/ExploreCards"
import Carousel from "../components/Carousel"

const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

export default function Home({ navigation }) {
    return (
        <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
        >
            <ImageBackground
                source={require("../assets/home-bg.png")}
                resizeMode="cover"
                style={styles.image}
            >
                <View style={styles.container}>
                    <Pressable
                        color={"transparent"}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? "rgba(255, 255, 255, 0.1)"
                                    : "transparent",
                            },
                            styles.announcementButton,
                        ]}
                    >
                        <Text style={styles.announcementText}>
                            Anunciamos nuestra próxima ronda de financiación.
                            Leer más →
                        </Text>
                    </Pressable>
                    <Text style={styles.title}>
                        Tu tienda de comics favorita
                    </Text>
                    <Text style={styles.subtitle}>
                        ¡Lee tus comics y mangas favoritos en cualquier lugar!
                    </Text>
                    <Pressable
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? "rgba(67, 56, 170, 1)"
                                    : "rgba(67, 56, 202, 1)",
                            },
                            styles.button,
                        ]}
                    >
                        <Text style={styles.buttonText}>Empezar</Text>
                    </Pressable>
                </View>
            </ImageBackground>
            <View style={styles.bodyContainer}>
                <View style={styles.exploreContainer}>
                    <ExploreCards />
                </View>
                <View style={styles.trendingContainer}>
                    <Text style={styles.trendingTitle}>Trending Manga</Text>
                    <Carousel />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: width,
        height: height,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    announcementButton: {
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 40,
        padding: 10,
        margin: 10,
    },
    announcementText: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white",
        margin: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
    },
    button: {
        borderRadius: 40,
        padding: 15,
        margin: 20,
        width: "80%",
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    bodyContainer: {
        backgroundColor: "#EBEBEB",
        alignItems: "center",
        width: "100%",
        height: "100%",
        paddingTop: 50,
        paddingBottom: 50,
    },
    trendingContainer: {
        marginTop: 80,
    },
    trendingTitle: {
        fontSize: 30,
        fontWeight: "#424242",
        textAlign: "center",
    },
})
