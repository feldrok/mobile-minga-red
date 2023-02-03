import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native"
import React, { useCallback } from "react"
import CategoryFilterComics from "./CategoryFilterComics"
import ComicsCard from "./ComicsCard"
import {
    FlatList,
    Gesture,
    GestureDetector,
} from "react-native-gesture-handler"
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated"
import { useDispatch, useSelector } from "react-redux"
import comicActions from "../store/comics/actions"
import ExploreCardsComics from "./ExploreCardsComics"
import { useFocusEffect } from "@react-navigation/native"

const { getComics } = comicActions

const { height: SCREEN_HEIGHT } = Dimensions.get("window")
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT * 0.765

const colors = [
    "#ef8481",
    "#fc9c57",
    "#00ba88",
    "#8883f0",
    "#18a0ff",
    "#f7b500",
]

export default function BottomContainerComics() {
    const storeCategories = useSelector((store) => store.categories)
    const storeComics = useSelector((store) => store.comics)
    const dispatch = useDispatch()
    const translateY = useSharedValue(0)
    const context = useSharedValue({ y: 0 })

    const scrollTo = useCallback((destination) => {
        "worklet"
        translateY.value = withSpring(destination, { damping: 50 })
    })

    const gesture = Gesture.Pan()
        .onStart((e) => {
            context.value = { y: translateY.value }
        })
        .onUpdate((e) => {
            translateY.value = e.translationY + context.value.y
            translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
            translateY.value = Math.min(translateY.value, -SCREEN_HEIGHT / 3)
        })
        .onEnd(() => {
            if (translateY.value < -SCREEN_HEIGHT / 2) {
                scrollTo(MAX_TRANSLATE_Y)
            } else if (translateY.value > -SCREEN_HEIGHT / 2) {
                scrollTo(-SCREEN_HEIGHT / 3)
            }
        })

    const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderTopLeftRadius = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
            [70, 5],
            Extrapolate.CLAMP
        )

        const borderTopRightRadius = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
            [70, 5],
            Extrapolate.CLAMP
        )

        return {
            borderTopLeftRadius,
            borderTopRightRadius,
            transform: [{ translateY: translateY.value }],
        }
    })

    useFocusEffect(useCallback(() => {
        scrollTo(-SCREEN_HEIGHT / 3)
        if (storeComics.comics.response?.length === undefined) {
            dispatch(getComics({
                limit: "",
                title: "",
                category_id: "",
            }))
        }
    }, []))

    const handleLoadMore = () => {
        const limit = storeComics?.comics?.response.length
        if (storeCategories.activeCategory === "all") {
            if (limit >= 4) {
                dispatch(
                    getComics({
                        limit: limit + 4,
                        title: "",
                        category_id: "",
                    })
                )
            }
        } else {
            if (limit >= 4) {
                dispatch(
                    getComics({
                        limit: limit + 4,
                        title: "",
                        category_id: storeCategories?.activeCategory,
                    })
                )
            }
        }
    }

    const setCategoryColors = (id) => {
        if (storeCategories.categories.response?.length === 0) {
            return <h4>No category found</h4>
        } else {
            return colors[
                storeCategories.categories?.response?.findIndex(
                    (category) => category._id === id
                )
            ]
        }
    }

    return (
        <Animated.View style={[rBottomSheetStyle, styles.container]}>
            <GestureDetector gesture={gesture}>
                <View style={styles.header}>
                    <View style={styles.containerHandle} />
                </View>
            </GestureDetector>
            <View style={styles.exploreContainer}>
                <ExploreCardsComics />
            </View>
            <View style={styles.buttonsContainer}>
                <CategoryFilterComics />
                <TouchableOpacity
                    style={styles.filterButton}
                >
                </TouchableOpacity>
            </View>
            <FlatList
                data={storeComics.comics?.response}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <ComicsCard
                        title={item?.title}
                        category={item?.category_id}
                        image={item?.photo}
                        color={setCategoryColors(item?.category_id)}
                    />
                )}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={1}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No comics found</Text>
                    </View>
                }
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: SCREEN_HEIGHT / 1.3,
        backgroundColor: "#EBEBEB",
        alignItems: "center",
        width: "100%",
        height: SCREEN_HEIGHT,
        paddingBottom: 100,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
    },
    header: {
        width: "100%",
        padding: 10,
    },
    containerHandle: {
        width: 50,
        height: 5,
        backgroundColor: "#4338CA",
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 10,
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    filterButton: {
        width: "20%",
        position: "absolute",
        right: 0,
    },
    scrollView: {
        width: "80%",
    },
    exploreContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    }
})