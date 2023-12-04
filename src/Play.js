import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image,PixelRatio } from "react-native";
import { useFonts } from 'expo-font';

function Categories({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        'Syncopate-Bold': require('../assets/fonts/Syncopate-Bold.ttf'),
        'Syncopate-Regular': require('../assets/fonts/Syncopate-Regular.ttf'),
        'Sura-Bold': require('../assets/fonts/Sura-Bold.ttf'),
        'Sura-Regular': require('../assets/fonts/Sura-Regular.ttf'),
    });
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"#03174B"} />
            <View style={styles.searchContainer}>
                <Text style={styles.logo}>MELODYBOX</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/images/search_gradient_32.png")}
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.chucnang}>Chức năng đang phát triển, cám ơn bạn đã sử dụng app</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#03174B",
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Đẩy các phần tử ra xa nhau càng nhiều càng tốt
        paddingRight: PixelRatio.roundToNearestPixel(10), // Khoảng cách 5px từ cạnh phải màn hình
        marginTop: PixelRatio.roundToNearestPixel(55),
    },
    logo: {
        fontFamily: 'Syncopate-Bold',
        fontSize: PixelRatio.roundToNearestPixel(30),
        color: "#DD27C7",
        marginLeft: PixelRatio.roundToNearestPixel(20),
    },
    iconContainer: {
        marginLeft: 'auto', // Cho phần tử nằm bên phải cùng
    },
    searchIcon: {
        width: PixelRatio.roundToNearestPixel(35),
        height: PixelRatio.roundToNearestPixel(35),
    },
    chucnang: {
        fontFamily: 'Sura-Regular',
        marginTop: PixelRatio.roundToNearestPixel(100),
        marginLeft: PixelRatio.roundToNearestPixel(20),
        color: "white",
        fontSize: PixelRatio.roundToNearestPixel(22),
        textAlign: 'center', 
    },
});
export default Categories;