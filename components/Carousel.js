import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native"
import React from "react"
import Slide from "./Slide"
import { useSelector } from "react-redux"

const width = Dimensions.get("window").width

export default function Carousel({ navigation }) {
    const storeComics = useSelector((state) => state.comics)    

    return (
        <>
            <FlatList
                data={storeComics.comics?.response}
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
                            image={item.photo}
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
                keyExtractor={(item) => item._id}
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
