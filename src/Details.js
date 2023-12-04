import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, PixelRatio, StatusBar } from "react-native";
import { Audio } from "expo-av";

function Details({ route, navigation }) {

  const { baihatc } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();

  const playSound = async (url) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true });
      setSound(sound);
    } catch (error) {
      console.error('Error creating sound:', error);
    }
  };

  const handlePlay = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      console.log('Playback Status:', status);
      if (status.isLoaded) {
        if (status.isPlaying) {
          sound.pauseAsync();
          setIsPlaying(false);
        } else {
          sound.playAsync();
          setIsPlaying(true);
        }
      }
    } else {
      var url = "http://192.168.1.30:3000/audios/" + baihatc.audio;
      playSound(url);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (sound) {
      if (isPlaying) {
        sound.playAsync();
        setIsPlaying(true);
      } else {
        sound.pauseAsync();
        setIsPlaying(false);
      }
    } else {
      var url = "http://192.168.1.30:3000/audios/" + baihatc.audio;
      playSound(url);
      setIsPlaying(true);
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [baihatc, sound]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="#03174B" barStyle="white-content" />
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
      <Image
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: PixelRatio.roundToNearestPixel(15),
          marginTop: PixelRatio.roundToNearestPixel(50),
          width: PixelRatio.roundToNearestPixel(360),
          height: PixelRatio.roundToNearestPixel(380),
        }}
        source={{
          uri: "http://192.168.1.30:3000/images/" + baihatc.image,
        }}
      />
      <Text style={styles.title}>{baihatc.title}</Text>
      <Text style={styles.text}>{baihatc.artist}</Text>
      <View style={styles.container2}>

        <TouchableOpacity >
          <Image
            style={styles.shuffle_button}
            source={require("../assets/images/shuffle_32.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image
            style={styles.previous_button}
            source={require("../assets/images/previous_32.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlay}>
          <Image
            source={
              isPlaying
                ? require("../assets/images/stop_64.png")
                : require("../assets/images/play_64.png")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity  >
          <Image
            style={styles.next_button}
            source={require("../assets/images/next-button_32.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image
            style={styles.playlist_button}
            source={require("../assets/images/playlist_32.png")}
          />
        </TouchableOpacity>
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
  text: {
    color: "white",
    fontSize: PixelRatio.roundToNearestPixel(20),
    textAlign: "center",
    marginTop: PixelRatio.roundToNearestPixel(3),
    marginLeft: PixelRatio.roundToNearestPixel(20),
    fontFamily: 'Sura-Regular',
  },
  title: {
    fontFamily: 'Sura-Bold',
    color: "white",
    fontSize: PixelRatio.roundToNearestPixel(25),
    fontWeight: "bold",
    textAlign: "center",
    marginTop: PixelRatio.roundToNearestPixel(15),
    marginLeft: PixelRatio.roundToNearestPixel(20)
  },

  container2: {
    flexDirection: "row",
    marginTop: PixelRatio.roundToNearestPixel(30),
    alignItems: "center",
    justifyContent: "center",
  },
  next_button: {
    marginTop: PixelRatio.roundToNearestPixel(15),
    marginLeft: PixelRatio.roundToNearestPixel(20),
  },

  previous_button: {
    marginTop: PixelRatio.roundToNearestPixel(15),
    marginRight: PixelRatio.roundToNearestPixel(20),
  },

  shuffle_button: {
    marginTop: PixelRatio.roundToNearestPixel(15),
    marginRight: PixelRatio.roundToNearestPixel(60),
  },
  playlist_button: {
    marginTop: PixelRatio.roundToNearestPixel(18),
    marginLeft: PixelRatio.roundToNearestPixel(60),
  },
});

export default Details;


