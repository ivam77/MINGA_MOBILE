import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import React from 'react';
import fondo from '../../assets/fondo.png';
import menu from '../../assets/icono-menu.png';
import logo from '../../assets/minga-logo.png';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';

export default function HomeScreen(props) {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            setIsLoggedIn(!!token);
        } catch (error) {
            console.error("Error checking login status:", error);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={fondo} style={styles.background}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                        <Image source={menu} style={styles.menu} />
                    </TouchableOpacity>
                    <Image source={logo} style={styles.logo} />
                </View>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View>
                        <Text style={[styles.text, styles.title]}>Your favorite comic book store</Text>
                        <Text style={[styles.text, styles.subtitle]}>
                            From classics to novelties, we have everything you need to immerse yourself in your favorite universes. Explore
                            our catalog and live the adventure of your life.
                        </Text>
                        <TouchableOpacity style={styles.button}>
                            <Text
                                style={styles.buttonText}
                                onPress={() => {
                                    if (isLoggedIn) {
                                        navigation.navigate("Mangas");
                                    } else {
                                        navigation.navigate("Register");
                                    }
                                }}
                            >
                                {isLoggedIn ? "Lets go!" : "Sign In"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
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
    menu: {
        width: 55,
        height: 55,
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingBottom: 50,
    },
    text: {
        color: 'white',
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#4338CA",
        paddingVertical: 10,
        paddingHorizontal: 80,
        borderRadius: 30,
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
