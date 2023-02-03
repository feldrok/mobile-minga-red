import { View, Text, StyleSheet, Image } from "react-native"
import React from "react"
import { useSelector } from "react-redux"
import { TouchableOpacity } from "react-native-gesture-handler"

export default function ComicsCard({ title, category, image, color, navigation }) {
    const storeCategories = useSelector((state) => state.categories)
    const storeComics = useSelector((state) => state.comics)

    const renderCategoryType = () => {
        if (storeComics.comics?.response?.length === 0) {
            return (
                <Text>
                    {storeCategories.activeCategory}
                </Text>
            )
        } else {
            return storeCategories.categories?.response?.map((item) => {
                if (item._id === category) {
                    return (
                        <Text key={item._id} style={{ color: color }}>
                            {item.name}
                        </Text>
                    )
                } else {
                    return null
                }
            })
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.75} style={styles.container}>
            <View
                style={[
                    styles.leftContainer,
                    { borderLeftColor: color },
                ]}
            >
                <Text style={styles.title}>{title}</Text>
                {renderCategoryType()}
            </View>
            <View style={styles.rightContainer}>
                <Image source={{ uri: `${image}` }} style={styles.image} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        width: 250,
        height: 120,
        borderRadius: 20,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
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
        borderLeftWidth: 5,
        width: "55%",
        height: "60%",
        justifyContent: "center",
        paddingLeft: 20,
    },
    rightContainer: {
        width: "45%",
        paddingLeft: 5,
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
        fontSize: 15,
        fontWeight: "bold",
    },
    category: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 35,
        borderBottomRightRadius: 1,
        borderTopRightRadius: 1,
        alignSelf: "center"
    },
})
