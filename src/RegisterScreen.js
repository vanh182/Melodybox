import * as React from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert, View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, PixelRatio, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';

function RegisterScreen({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        'Syncopate-Bold': require('../assets/fonts/Syncopate-Bold.ttf'),
        'Syncopate-Regular': require('../assets/fonts/Syncopate-Regular.ttf'),
        'Sura-Regular': require('../assets/fonts/Sura-Regular.ttf'),
    });
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setconfirmPassword] = React.useState('');
    const [hidePassword, setHidePassword] = React.useState(true);
    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const handleRegister = async () => {
        const emptyFields = [];
        if (!email) {
            emptyFields.push('Email');
        }
        if (!username) {
            emptyFields.push('Username');
        }
        if (!password) {
            emptyFields.push('Password');
        }
        if (!confirmPassword) {
            emptyFields.push('Confirm Password');
        }

        if (emptyFields.length > 0) {
            const errorMessage = `Please fill in the following fields: ${emptyFields.join(', ')}`;
            Alert.alert('Error', errorMessage);
            return;
        }
        if (!email.endsWith('@gmail.com')) {
            Alert.alert('Error', 'Email must end with @gmail.com');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        // Gửi yêu cầu đăng ký đến server
        try {
            const response = await axios.post('http://192.168.1.30:3000/api/users/register', {
                username,
                email,
                password
            });
            console.log('User registered:', response.data.user);
            Alert.alert('Success', 'User registered successfully');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                Alert.alert('Error', error.response.data.error);
            } else {
                Alert.alert('Error', 'An error occurred while registering');
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>

                <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
                <Text style={styles.meloText}>MELODYBOX</Text>
                <Text style={styles.signInText}>SIGN UP</Text>
                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/images/mail.png')}
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#C5BBBB"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
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
                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/images/password_icon.png')}
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confrim password"
                        secureTextEntry={hidePassword}
                        placeholderTextColor="#C5BBBB"
                        value={confirmPassword}
                        onChangeText={setconfirmPassword}
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
                    onPress={handleRegister} >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <Text style={styles.AlreadyText}>Already have an account?</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SignIn');
                    }}>
                    <Text style={styles.signUpText}>Sign in</Text>
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
export default RegisterScreen;

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

    AlreadyText: {
        marginTop: PixelRatio.roundToNearestPixel(30),
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
        marginBottom: 20
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
        marginTop: PixelRatio.roundToNearestPixel(30),
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
        flex: 1,
        backgroundColor: '#b72fbb',
    },
    Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
});