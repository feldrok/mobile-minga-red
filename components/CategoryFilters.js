import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import React from "react"

const categories = [
    {
        id: "1",
        title: "Shonen",
        color: "#FFE0DF",
        textColor: "#EF8481"
    },
    {
        id: "2",
        title: "Seinen",
        color: "#FFDFC8",
        textColor: "#FC9C57"
    },
    {
        id: "3",
        title: "Shoujo",
        color: "#D1FBF0",
        textColor: "#00BA88"
    },
    {
        id: "4",
        title: "Marvel",
        color: "#b8e2ff",
        textColor: "#18a0ff"
    },
    {
        id: "5",
        title: "DC",
        color: "#E0DBFF",
        textColor: "#8883F0"
    }
]

export default function CategoryFilters() {
    return (
        <View style={styles.container}>
            {categories.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    style={[styles.category, { backgroundColor: category.color }, { textColor: category.textColor }]}
                >
                    <Text style={[styles.categoryText, { color: category.textColor }]}>
                        {category.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "80%",
    },
    category: {
        padding: 10,
        margin: 5,
        borderRadius: 20,
        width: 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
    },
    categoryText: {
        textAlign: "center",
        fontSize: 12,
    },
})
