import {
    StyleSheet,
    Image,
    TouchableHighlight,
    Dimensions,
    Text,
} from "react-native"
import React from "react"

const width = Dimensions.get("window").width

export default function Slide({ title, image, description }) {
    return (
        <>
            <TouchableHighlight
                style={styles.image}
                imageStyle={{ borderRadius: 20 }}
            >
                <Image source={image} style={styles.image} />
            </TouchableHighlight>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: width - 10,
        height: 250,
        borderRadius: 20,
    },
})
