import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native"
import React from "react"
import Slide from "./Slide"

const data = [
    {
        id: "1",
        title: "Manga 1",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        image: require("../assets/manga-1.png"),
    },
    {
        id: "2",
        title: "Manga 2",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        image: require("../assets/manga-2.png"),
    },
    {
        id: "3",
        title: "Manga 3",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        image: require("../assets/manga-3.png"),
    },
]

const width = Dimensions.get("window").width

export default function Carousel() {
    return (
        <>
            <FlatList
                data={data}
                nestedScrollEnabled={true}
                width={width - 10}
                maxHeight={500}
                horizontal
                pagingEnabled
                style={styles.container}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.wrapper}>
                        <Slide
                            title={item.title}
                            image={item.image}
                            description={item.description}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>
                                {item.description}
                            </Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 20,
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    textContainer: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#222222",
        textAlign: "center",
        paddingTop: 20,
    },
    description: {
        fontSize: 14,
        color: "#9795A4",
        textAlign: "center",
        paddingTop: 20,
    },
})
