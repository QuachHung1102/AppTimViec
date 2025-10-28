import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { useCustomFonts } from "../assets/componentStyleSheet";
import { useNavigation } from '@react-navigation/native';
import { getCurrentUser } from "../utils/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

function PreLoad() {
    let [fontsLoaded] = useCustomFonts();
    const navigation = useNavigation();

    useEffect(() => {
        if (fontsLoaded) {
            navigateToHome();
        }
    }, [fontsLoaded]);

    async function navigateToHome() {
        try {
            const user = await getCurrentUser();
            if (user && user.name) {
                // User đã đăng nhập
                navigation.navigate('Tab');
            } else {
                // Chưa đăng nhập
                navigation.navigate('LogReg');
            }
        } catch (error) {
            console.error('Error checking auth:', error);
            navigation.navigate('LogReg');
        }
    }

    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <View>
                {/* your other components go here */}
            </View>
        );
    }
}

export default PreLoad;