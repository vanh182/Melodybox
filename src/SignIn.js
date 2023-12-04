import * as React from 'react';
import { Alert, TouchableWithoutFeedback, Keyboard, View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, PixelRatio, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


function SignIn({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        'Syncopate-Bold': require('../assets/fonts/Syncopate-Bold.ttf'),
        'Syncopate-Regular': require('../assets/fonts/Syncopate-Regular.ttf'),
        'Sura-Regular': require('../assets/fonts/Sura-Regular.ttf'),
    });

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [hidePassword, setHidePassword] = React.useState(true);
    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const handleLogin = async () => {
        const emptyFields = [];
        if (!username) {
            emptyFields.push('Username');
        }
        if (!password) {
            emptyFields.push('Password');
        }
        if (emptyFields.length > 0) {
            const errorMessage = `Please fill in the following fields: ${emptyFields.join(', ')}`;
            Alert.alert('Error', errorMessage);
            return;
        }
        // Gửi yêu cầu đăng nhập đến server
        try {
            const response = await axios.post('http://192.168.1.30:3000/api/users/login', {
                username,
                password
            });

            // Lưu thông tin người dùng vào AsyncStorage
            await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));


            console.log('User logged in. Token:', response.data.token);
            // Chuyển hướng đến màn hình WelcomeScreen
            navigation.replace('Welcome', {
                username: response.data.username,
                email: response.data.email
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Sai tên đăng nhập hoặc mật khẩu
                Alert.alert('Login Failed', 'Incorrect username or password.');
            } else {
                console.error('Error logging in:', error);
            }
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
                <Text style={styles.meloText}>MELODYBOX</Text>
                <Text style={styles.signInText}>SIGN IN</Text>
                <Text style={styles.pleaseText}>Please fill the credentials</Text>
                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/images/icon-login.png')}
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#C5BBBB"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/images/password_icon.png')}
                        style={styles.icon}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={hidePassword}
                        placeholderTextColor="#C5BBBB"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Image
                            source={hidePassword ? require('../assets/images/Hide.png') : require('../assets/images/Unhide.png')}
                            style={styles.iconPassword}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <Text style={styles.dontText}>Don't have an account yet?</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('RegisterScreen');
                    }}>
                    <Text style={styles.signUpText}>Sign up</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.Image}
                        source={require('../assets/images/signin_signup-screen.png')}
                        resizeMode="cover"
                    />
                </View>
            </View>

        </TouchableWithoutFeedback>
    );
}
export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: StatusBar.currentHeight || 0,
    },

    meloText: {
        marginTop: PixelRatio.roundToNearestPixel(50),
        fontSize: PixelRatio.roundToNearestPixel(20),
        color: '#DD27C7',
        fontFamily: 'Syncopate-Bold',
        marginEnd: PixelRatio.roundToNearestPixel(40),
        marginStart: PixelRatio.roundToNearestPixel(40),
    },
    signInText: {
        marginTop: PixelRatio.roundToNearestPixel(40),
        fontSize: PixelRatio.roundToNearestPixel(30),
        color: 'black',
        fontFamily: 'Syncopate-Bold',
        marginEnd: PixelRatio.roundToNearestPixel(40),
        marginStart: PixelRatio.roundToNearestPixel(40),
    },
    pleaseText: {
        marginTop: PixelRatio.roundToNearestPixel(10),
        marginBottom: PixelRatio.roundToNearestPixel(50),
        fontSize: PixelRatio.roundToNearestPixel(18),
        color: "#C5BBBB",
        fontFamily: 'Sura-Regular',
        marginEnd: PixelRatio.roundToNearestPixel(40),
        marginStart: PixelRatio.roundToNearestPixel(40),
    },
    dontText: {
        marginTop: PixelRatio.roundToNearestPixel(50),
        fontSize: PixelRatio.roundToNearestPixel(18),
        color: "#888888",
        textAlign: 'center',
        fontFamily: 'Sura-Regular',
        marginEnd: PixelRatio.roundToNearestPixel(40),
        marginStart: PixelRatio.roundToNearestPixel(40),
    },
    signUpText: {
        textAlign: 'center',
        color: '#DD27C7',
        fontSize: PixelRatio.roundToNearestPixel(18),
        fontFamily: 'Sura-Regular',
        marginEnd: PixelRatio.roundToNearestPixel(40),
        marginStart: PixelRatio.roundToNearestPixel(40),
        marginBottom: 30
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0e6f4',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 15,
        marginEnd: PixelRatio.roundToNearestPixel(40),
        marginStart: PixelRatio.roundToNearestPixel(40),
    },
    icon: {
        width: 23,
        height: 23,
        marginRight: 10,
        tintColor: '#C5BBBB', // Màu biểu tượng
    },
    iconPassword: {
        width: 23,
        height: 23,
        marginLeft: 10,
        tintColor: '#C5BBBB', // Màu biểu tượng
    },
    input: {
        flex: 1,
        color: 'black',
        height: 40,
        fontSize: PixelRatio.roundToNearestPixel(18),
        fontFamily: 'Sura-Regular',

    },
    button: {
        marginTop: PixelRatio.roundToNearestPixel(50),
        borderRadius: PixelRatio.roundToNearestPixel(10),
        backgroundColor: '#042099',
        paddingHorizontal: PixelRatio.roundToNearestPixel(20),
        paddingVertical: PixelRatio.roundToNearestPixel(10),
        marginEnd: PixelRatio.roundToNearestPixel(40),
        marginStart: PixelRatio.roundToNearestPixel(40),
    },
    buttonText: {
        fontSize: PixelRatio.roundToNearestPixel(20),
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Sura-Regular',
    },
    imageContainer: {
        backgroundColor: '#b72fbb',
        flex: 1
    },
    Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});