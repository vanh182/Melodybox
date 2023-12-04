import * as React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, PixelRatio, } from 'react-native';
import { useFonts } from 'expo-font';

function Welcome({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        'Syncopate-Bold': require('../assets/fonts/Syncopate-Bold.ttf'),
        'Syncopate-Regular': require('../assets/fonts/Syncopate-Regular.ttf'),
        'Sura-Bold': require('../assets/fonts/Sura-Bold.ttf'),
        'Sura-Regular': require('../assets/fonts/Sura-Regular.ttf'),
    });
    const { username, email } = route.params;

    return (
        <View style={styles.container}>
             <StatusBar translucent backgroundColor="#03174B" barStyle="white-content" />
            <Text style={styles.meloText}>MELODYBOX</Text>
            <View style={styles.content}>
                <Text style={styles.WelcomeText}>Welcome! Buddy</Text>
                <Text style={styles.nameText}>{username}</Text>
                <Text style={styles.nameText}>{email}</Text>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.Image}
                        source={require('../assets/images/welcome.png')}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.horizontalLine}></View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // navigation.replace('BottomTabNavigator');
                        navigation.navigate('BottomTabNavigator', { username, email });

                    }}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('SignIn');
                    }}>
                    <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default Welcome;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#03174B",
        marginTop: StatusBar.currentHeight || 0,
    },
    content: {
        flex: 0.72,
        marginTop: PixelRatio.roundToNearestPixel(50),
        marginHorizontal: PixelRatio.roundToNearestPixel(10),
        backgroundColor: '#FFFFFF',
        borderRadius: PixelRatio.roundToNearestPixel(40),
    },
    meloText: {
        marginTop: PixelRatio.roundToNearestPixel(50),
        fontSize: PixelRatio.roundToNearestPixel(30),
        color: "#DD27C7",
        fontFamily: 'Syncopate-Bold',
        textAlign: 'center'
    },
    WelcomeText: {
        marginTop: PixelRatio.roundToNearestPixel(35),
        fontSize: PixelRatio.roundToNearestPixel(22),
        color: '#DD27C7',
        fontFamily: 'Syncopate-Bold',
        textAlign: 'center'
    },
    nameText: {
        marginTop: PixelRatio.roundToNearestPixel(10),
        fontSize: PixelRatio.roundToNearestPixel(18),
        color: "black",
        fontFamily: 'Sura-Regular',
        textAlign: 'center',
    },

    button: {
        marginTop: PixelRatio.roundToNearestPixel(15),
        borderRadius: PixelRatio.roundToNearestPixel(10),
        backgroundColor: '#042099',
        paddingHorizontal: PixelRatio.roundToNearestPixel(20),
        paddingVertical: PixelRatio.roundToNearestPixel(10),
        marginHorizontal: PixelRatio.roundToNearestPixel(30),
    },
    buttonText: {
        fontSize: PixelRatio.roundToNearestPixel(20),
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Sura-Regular',
    },
    horizontalLine: {
        marginTop: PixelRatio.roundToNearestPixel(15),
        height: 1,
        backgroundColor: 'black',
        marginHorizontal: PixelRatio.roundToNearestPixel(20),
    },
    imageContainer: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    Image: {
        width: PixelRatio.roundToNearestPixel(150),
        height: PixelRatio.roundToNearestPixel(150),
        resizeMode: 'contain',

    }
});