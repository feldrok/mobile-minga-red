import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native"
import React, { useCallback, useEffect } from "react"
import CategoryFilters from "../components/CategoryFilters"
import ComicCard from "../components/ComicCard"
import { Icon } from "@rneui/themed"
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

const { getComics, getFavouriteComics } = comicActions

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

export default function BottomContainer() {
    const storeCategories = useSelector((state) => state.categories)
    const storeComics = useSelector((state) => state.comics)
    const dispatch = useDispatch()
    const [sort, setSort] = React.useState(false)

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

    useEffect(() => {
        scrollTo(-SCREEN_HEIGHT / 3)
        if (storeComics.comics.length === 0) {
            dispatch(
                getFavouriteComics({
                    user_id: "63c5a72e3395adc7174cea60",
                    limit: 4,
                })
            )
        }
    }, [])

    const handleLoadMore = () => {
        const limit = storeComics.comics?.response?.length
        if (storeCategories.activeCategory === "all") {
            if (limit >= 4) {
                dispatch(
                    getFavouriteComics({
                        user_id: "63c5a72e3395adc7174cea60",
                        limit: limit + 4,
                        title: "",
                        category_id: "",
                        order: sort === false ? "asc" : "desc",
                    })
                )
            }
        } else {
            if (limit >= 4) {
                dispatch(
                    getFavouriteComics({
                        user_id: "63c5a72e3395adc7174cea60",
                        limit: limit + 4,
                        title: "",
                        category_id: storeCategories.activeCategory,
                        order: sort === false ? "asc" : "desc",
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

    const handleSort = () => {
        if (sort === true) {
            setSort(false)
            dispatch(
                getFavouriteComics({
                    user_id: "63c5a72e3395adc7174cea60",
                    limit: 4,
                    title: "",
                    category_id:
                        storeCategories.activeCategory !== "all"
                            ? storeCategories.activeCategory
                            : "",
                    order: "asc",
                })
            )
        } else {
            setSort(true)
            dispatch(
                getFavouriteComics({
                    user_id: "63c5a72e3395adc7174cea60",
                    limit: 4,
                    title: "",
                    category_id:
                        storeCategories.activeCategory !== "all"
                            ? storeCategories.activeCategory
                            : "",
                    order: "desc",
                })
            )
        }
    }

    return (
        <Animated.View style={[rBottomSheetStyle, styles.container]}>
            <GestureDetector gesture={gesture}>
                <View style={styles.header}>
                    <View style={styles.containerHandle} />
                </View>
            </GestureDetector>
            <View style={styles.buttonsContainer}>
                <CategoryFilters />
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={handleSort}
                >
                    <Icon name="sort" size={30} color="#4338CA" />
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
                    <ComicCard
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
        width: "100%",
    },
})
