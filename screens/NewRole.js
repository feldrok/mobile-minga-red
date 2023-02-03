import React from "react"
import { View, Text, Pressable, Image, StyleSheet, TouchableOpacity } from "react-native"


const NewRole = ({ navigation }) => {

    return (
        <View style={styles.allContainer}>
            <View style={styles.joinContainer}>
                <View>
                    <Text style={styles.title}>Sing up to</Text>
                    <Text style={styles.subtitle}>Minga.com</Text>
                </View>
                <Pressable style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? "rgba(0, 0, 0, .1)"
                            : "transparent",
                    },
                    styles.joinAs,
                ]}>
                    <View style={styles.joinContent}>
                        <View style={styles.imgJoinAs}>
                            <Image style={styles.ellipse3} source={require("../assets/Ellipse_3.png")} />
                            <Image style={styles.ellipse4} source={require("../assets/Ellipse_4.png")} />
                            <Image style={styles.ellipse5} source={require("../assets/Ellipse_5.png")} />
                        </View>
                        <View style={styles.textJoinAs}>
                            <Text style={styles.firstText}>Join as an Author!</Text>
                            <Text style={styles.secondText}>I'm a reader writting a manga</Text>
                        </View>
                    </View>
                </Pressable>
                <Pressable style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? "rgba(0, 0, 0, .1)"
                            : "transparent",
                    },
                    styles.joinAs,
                ]}>
                    <View style={styles.joinContent}>
                        <View style={styles.imgJoinAs}>
                            <Image style={styles.ellipse3} source={require("../assets/Ellipse_3C.png")} />
                            <Image style={styles.ellipse4} source={require("../assets/Ellipse_4C.png")} />
                            <Image style={styles.ellipse5} source={require("../assets/Ellipse_5C.png")} />
                        </View>
                        <View style={styles.textJoinAs}>
                            <Text style={styles.firstText}>Join as a Company!</Text>
                            <Text style={styles.secondText}>I’m a company and I want to publish my comics</Text>
                        </View>
                    </View>
                </Pressable>
                <View style={styles.footerContain}>
                <Text>
                    Go back to
                </Text>
                <TouchableOpacity>
                    <Text style={styles.footerText}> Home page</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    allContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    subtitle: {
        fontSize: 40,
        textAlign: "center",
        marginBottom: 60,
        color: "#1B6FA8"
    },
    title: {
        textAlign: "center"
    },
    joinContainer: {
        width: "90%"
    },
    joinAs: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "rgba(0, 0, 0, 0.2)",
        height: 60,
        justifyContent: "center",
        padding: 5,
        marginBottom: 30,
    },
    joinContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    imgJoinAs: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    ellipse3: {
        width: 25,
        height: 25
    },
    ellipse4: {
        width: 30,
        height: 30,
        marginHorizontal: -7,
        position: "relative",
        zIndex: 1
    },
    ellipse5: {
        width: 25,
        height: 25
    },
    textJoinAs: {
        width: "60%",
        paddingLeft: 10
    },
    firstText: {
        fontWeight: "bold"
    },
    secondText: {
        fontSize: 12
    },
    footerContain: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
    },
    footerText: {
        color: "#1B6FA8",
        fontWeight: "bold",
    },
})

export default NewRole