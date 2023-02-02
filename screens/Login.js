import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
} from "react-native"
import React from "react"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import { useDispatch, useSelector } from "react-redux"
import userActions from "../store/user/actions"
import AsyncStorage from "@react-native-async-storage/async-storage"

const { signIn } = userActions

export default function Login({ navigation }) {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const storeUser = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleSignIn = async () => {
        let user = {
            mail: email,
            password: password,
        }
        let response = await dispatch(signIn(user))
        let token = response.payload?.response?.user?.response?.token
        let loggedUser = response.payload?.response?.user?.response?.user
        if (token) {
            await AsyncStorage.setItem("token", token)
            await AsyncStorage.setItem("user", JSON.stringify(loggedUser))
            navigation.navigate("Home")
        } else {
            alert("Invalid credentials")
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Minga 雪</Text>
                <Text style={styles.subtitle}>Welcome back!</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    autoComplete="email"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    autoComplete="password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    onPress={handleSignIn}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? "rgba(0, 0, 0, .1)"
                                : "transparent",
                        },
                        styles.googleButton,
                    ]}
                >
                    <Image source={require("../assets/Google.png")} />
                    <Text style={styles.googleButtonText}>
                        Sign in with Google
                    </Text>
                </Pressable>
            </View>
            <View style={styles.footerText}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity>
                    <Text style={styles.signUpText}> Sign up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footerText}>
                <Text>Go back to</Text>
                <TouchableOpacity>
                    <Text style={styles.signUpText}> home page</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontSize: 40,
        fontWeight: "medium",
        color: "#1B6FA8",
    },
    subtitle: {
        fontSize: 20,
    },
    formContainer: {
        display: "flex",
    },
    textInput: {
        backgroundColor: "white",
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: 300,
    },
    button: {
        backgroundColor: "#1B6FA8",
        borderRadius: 10,
        padding: 15,
        margin: 10,
        width: 300,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    googleButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        borderRadius: 10,
        padding: 15,
        margin: 10,
        width: 300,
    },
    googleButtonText: {
        fontSize: 16,
        color: "rgba(0,0,0,0.4)",
        textAlign: "center",
        fontWeight: "bold",
    },
    footerText: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    signUpText: {
        color: "#1B6FA8",
        fontWeight: "bold",
    },
})
