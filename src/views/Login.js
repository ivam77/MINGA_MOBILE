import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import logo from '../../assets/Logo.png';
import minga_logo2 from '../../assets/Inga.png';
import menu from '../../assets/icono-menu.png';
import signup from '../../assets/signup.png';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from "react-native";

export default function LoginScreen(props) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignInClick = async () => {
    try {
      const response = await fetch(
        "https://mingabackblueteam-production.up.railway.app/api/auth/signin",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const token = data.response.token;
        const user = data.response.user;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
        showMessage({
          message: "Success",
          description: "User signed in!",
          type: "success",
          animated: true,
          animationDuration: 800,
          icon: { icon: "success", position: "right" },
          style: { paddingVertical: 20, paddingHorizontal: 80 },
        });
        console.log("Login successful! Data:", user);
      } else {
        console.error("Login failed:", response.status);
      }
    } catch (error) {
      console.error("Error occurred during login:", error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // Forzar una actualización en la interfaz de usuario
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
      // Restablecer el estado de isLoggedIn a false
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

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
                    <Text style={styles.title}>Welcome back!</Text>
                    <Text style={styles.description}>
                    Discover manga, manhua and manhwa, track your progress, have fun, read manga.
                    </Text>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={handleEmailChange}
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
                            style={styles.signInButton}
                            onPress={handleSignInClick}
                        >
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>

                    <Image source={signup} style={styles.signup} />

                    <Text style={styles.linkText}>
                
                    you don't have an account yet?
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Register");
                            }}
                        >
                            <Text style={styles.link}> Sign Up</Text>
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
        marginBottom: 5,
    },
    input: {
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    signInButton: {
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