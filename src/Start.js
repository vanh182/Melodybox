import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, PixelRatio } from 'react-native';
import { useFonts } from 'expo-font';

function Start({ navigation }) {

    const [fontsLoaded] = useFonts({
        'Syncopate-Bold': require('../assets/fonts/Syncopate-Bold.ttf'),
        'Syncopate-Regular': require('../assets/fonts/Syncopate-Regular.ttf'),
        'Sura-Bold': require('../assets/fonts/Sura-Bold.ttf'),
        'Sura-Regular': require('../assets/fonts/Sura-Regular.ttf'),
      });
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <StatusBar translucent backgroundColor="#992bac" barStyle="dark-content"/>
                <Text style={styles.text}>MELODYBOX</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.replace('SignIn');
                    }}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.Image}
                    source={require('../assets/images//Start.png')}
                    resizeMode="cover"
                />
            </View>
        </View>
    );
}
export default Start;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#992bac',
        marginTop: StatusBar.currentHeight || 0
    },
    content: {
        flex: 0.4,
        alignItems: 'center',
    },
    text: {
        marginTop: PixelRatio.roundToNearestPixel(130),
        fontSize: PixelRatio.roundToNearestPixel(35),
        color: '#ffffff',
        fontFamily: 'Syncopate-Bold',
    },
    button: {
        marginTop: PixelRatio.roundToNearestPixel(40),
        borderRadius: PixelRatio.roundToNearestPixel(10),
        backgroundColor: '#DD27C8',
        paddingHorizontal: PixelRatio.roundToNearestPixel(20),
        paddingVertical: PixelRatio.roundToNearestPixel(10),
    },
    buttonText: {
        fontSize: PixelRatio.roundToNearestPixel(20),
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Sura-Bold',
    },
    imageContainer: {
        flex: 0.6,
        backgroundColor: '#992bac',
        aspectRatio: 1,
    },
    Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        marginStart: PixelRatio.roundToNearestPixel(-85),
    }
});