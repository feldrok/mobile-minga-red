import { View, Text, StyleSheet, Image } from "react-native"
import React from "react"

export default function ComicCard({ title, category, image }) {
    const categoryColor = category === "Shonen" ? "#EF8481" : category === "Seinen" ? "#FC9C57" : category === "Shoujo" ? "#00BA88" : category === "Marvel" ? "#18a0ff" : "#8883F0"
    
    return (
        <View style={styles.container}>
            <View style={[styles.leftContainer, { borderLeftColor: categoryColor } ]}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={[styles.category, { color: categoryColor }]}>
                    {category}
                </Text>
            </View>
            <View style={styles.rightContainer}>
                <Image source={image} style={styles.cover} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        width: 350,
        height: 200,
        borderRadius: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    leftContainer: {
        borderLeftWidth: 8,
        width: "50%",
        height: "60%",
        justifyContent: "center",
        paddingLeft: 20,
    },
    rightContainer: {
        width: "50%",
    },
    cover: {
        width: 180,
        height: "100%",
        borderTopLeftRadius: 90,
        borderBottomLeftRadius: 90,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    category: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
    }
})