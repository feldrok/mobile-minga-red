import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import categoryActions from "../store/categories/actions"
import comicActions from "../store/comics/actions"

const { getCategories, setActiveCategory } = categoryActions
const { getFavouriteComics } = comicActions

const colors = [
    "#ffe0df",
    "#ffe0df",
    "#d1fbf0",
    "#e0dbff",
    "#d8efff",
    "#fff8d8",
]
const textColors = [
    "#ef8481",
    "#fc9c57",
    "#00ba88",
    "#8883f0",
    "#18a0ff",
    "#f7b500",
]

export default function CategoryFilters() {
    const storeComics = useSelector((state) => state.comics)
    const storeCategories = useSelector((state) => state.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    const showAllComics = () => {
        dispatch(getFavouriteComics({
            user_id: "63c5a72e3395adc7174cea60",
            limit: 10,
            title: "",
            category_id: "",
        }))
        dispatch(setActiveCategory("all"))
    }

    const showComicsByCategory = (category_id) => {
        dispatch(getFavouriteComics({
            user_id: "63c5a72e3395adc7174cea60",
            limit: 10,
            title: storeComics.comics.activeSearch,
            category_id: category_id,
        }))
        dispatch(setActiveCategory(category_id))
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.categoryAll} onPress={showAllComics}>
                <Text style={styles.categoryText}>All</Text>
            </TouchableOpacity>
            {storeCategories.categories?.response?.map((category) => (
                <TouchableOpacity
                    key={category._id}
                    style={[
                        styles.category,
                        {
                            backgroundColor:
                                colors[
                                    storeCategories.categories?.response?.indexOf(
                                        category
                                    )
                                ],
                        },
                    ]}
                    onPress={() => showComicsByCategory(category._id)}
                >
                    <Text
                        style={[
                            styles.categoryText,
                            {
                                color: textColors[
                                    storeCategories.categories?.response?.indexOf(
                                        category
                                    )
                                ],
                            },
                        ]}
                    >
                        {category.name}
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
    categoryAll: {
        padding: 10,
        margin: 5,
        borderRadius: 20,
        width: 80,
        backgroundColor: "#e0e0e0",
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
