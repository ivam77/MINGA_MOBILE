import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import menu from '../../assets/icono-menu.png';
import minga_logo2 from '../../assets/minga_logo2.png';
import signup from '../../assets/signup.png';
import logo from '../../assets/minga-logo.png';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from "react-native";

export default function RegisterScreen(props) {
    
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (text) => {
        setEmail(text);
    };
    const handlePhotoChange = (text) => {
        setPhoto(text);
    };
    const handlePasswordChange = (text) => {
        setPassword(text);
    };
    const handleRegisterClick = async () => {
        try {
            const response = await fetch(
                "https://mingacolorback-production.up.railway.app/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, photo, password }),
                }
            );

            const data = await response.json();
            showMessage({
                message: "Success",
                description: "User register!",
                type: "success",
                animated: true,
                animationDuration: 800,
                icon: { icon: "success", position: "right" },
                style: { paddingVertical: 20, paddingHorizontal: 80 },
            });
            console.log("Registro exitoso:", data);
        } catch (error) {
            console.log("Error al registrar:", error);
        }
    };
    const handleGoogleLoginSuccess = (response) => {
    };
    const handleGoogleLoginFailure = (error) => {
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                        <Image source={menu} style={styles.menu} />
                    </TouchableOpacity>
                    <Image source={logo} style={styles.logo} />
                </View>
                <View style={styles.content}>
                <Image source={minga_logo2} style={styles.logo2} />

                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.description}>
                        Discover manga and comics, track your progress, have fun, read
                        manga.
                    </Text>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={handleEmailChange}
                        />

                        <Text style={styles.label}>Photo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Url"
                            value={photo}
                            onChangeText={handlePhotoChange}
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={true}
                        />

                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={handleRegisterClick}
                        >
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>

                    <Image source={signup} style={styles.signup} />
                       
                    </View>
                    <Text style={styles.linkText}>
                        Already have an account?
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Login");
                            }}
                        >
                            <Text style={styles.link}> Log in</Text>
                        </TouchableOpacity>
                    </Text>

                    <Text style={styles.linkText}>
                        Go back to
                        <TouchableOpacity
                            style={styles.link}
                            onPress={() => {
                                navigation.navigate("Home");
                            }}
                        >
                            <Text style={styles.link}> Home page</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    logo: {
        width: 54,
        height: 32,
        resizeMode: 'contain',
    },
    logo2: {
        width: '50%',
        height: 48,
    },
    menu: {
        width: 55,
        height: 55,
    },
    signup: {
        width: '80%',
        height: 40,
      },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
    },
    formContainer: {
        width: "100%",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 2,
        borderColor: "#4338CA",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    registerButton: {
        backgroundColor: "#4338CA",
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    linkText: {
        fontSize: 12,
        marginBottom: 5,
    },
    link: {
        color: "#4338CA",
    },
});