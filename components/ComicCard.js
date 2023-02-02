import { View, Text, StyleSheet, Image } from "react-native"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { TouchableOpacity } from "react-native-gesture-handler"
import reactionActions from "../store/reactions/actions"

const { addReaction } = reactionActions

export default function ComicCard({ title, category, image, color, comicId, navigation }) {
    const storeCategories = useSelector((state) => state.categories)
    const storeComics = useSelector((state) => state.comics)
    const storeReactions = useSelector((state) => state.reactions)
    const dispatch = useDispatch()

    const handleRemove = async () => {
        await dispatch(
            addReaction({
                comic_id: comicId,
                name: "favourite",
            })
        )
    }

    const renderCategoryType = () => {
        if (storeComics.favouriteComics?.response?.length === 0) {
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
        <View style={styles.container}>
            <View
                style={[
                    styles.leftContainer,
                    { borderLeftColor: color },
                ]}
            >
                <Text style={styles.title}>{title}</Text>
                {renderCategoryType()}
                <View>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleRemove}>
                        <Text style={styles.deleteText}>
                            Remove
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Image source={{ uri: `${image}` }} style={styles.image} />
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
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    category: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 10,
    },
    image: {
        width: 180,
        height: "100%",
        borderTopLeftRadius: 90,
        borderBottomLeftRadius: 90,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    deleteButton: {
        backgroundColor: "#fbdddc",
        width: 100,
        borderRadius: 20,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteText: {
        color: "#ee8380",
        fontWeight: "bold",
    },
})
