import React from "react";
import { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar, Image, PixelRatio } from "react-native";
import axios from "axios";
import { useFonts } from 'expo-font';

function Categories({ route, navigation }) {
  const [fontsLoaded] = useFonts({
    'Syncopate-Bold': require('../assets/fonts/Syncopate-Bold.ttf'),
    'Syncopate-Regular': require('../assets/fonts/Syncopate-Regular.ttf'),
    'Sura-Bold': require('../assets/fonts/Sura-Bold.ttf'),
    'Sura-Regular': require('../assets/fonts/Sura-Regular.ttf'),
  });

  const [DATA, getLoai] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Recommendation");

  const getapiLoai = async () => {
    try {
      const response = await axios.get("http://192.168.1.30:3000/api/categories/getAll");
      getLoai(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  React.useEffect(() => {
    getapiLoai();
  }, []);

  const getFavoriteSongs = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.30:3000/api/playlists/My%20Favorite%20Songs/songs"
      );
      setFavoriteSongs(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  React.useEffect(() => {
    getFavoriteSongs();
  }, []);

  const getPopularSongs = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.30:3000/api/playlists/Viral%20Hits/songs"
      );
      setFavoriteSongs(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "Popular") {
      getPopularSongs();
    } else {
      getFavoriteSongs();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="#03174B" barStyle="white-content" />
      <View style={styles.searchContainer}>
        <Text style={styles.logo}>MELODYBOX</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.touchable}>
            <Image
              source={require("../assets/images/search_gradient_32.png")}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.categories}>Categories</Text>
        <FlatList
          contentContainerStyle={{ paddingLeft: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={[styles.imageCard]}
                onPress={() =>
                  navigation.navigate("Songs", {
                    loaibaihatchon: item,
                  })
                }
              >
                <Image
                  source={{
                    uri: "http://192.168.1.30:3000/images/" + item.image,
                  }}
                  style={{
                    borderRadius: PixelRatio.roundToNearestPixel(15),
                    width: PixelRatio.roundToNearestPixel(135),
                    height: PixelRatio.roundToNearestPixel(140),
                  }}
                />
                <Text style={styles.text}>{item.tenloai}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={styles.container2}>
        <TouchableOpacity
          onPress={() => handleCategoryChange("Recommendation")}
        >
          <Text style={styles.recommendation}>Recommendation</Text>
          <View
            style={
              selectedCategory === "Recommendation" ? styles.underline : {}
            }
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleCategoryChange("Popular")}>
          <Text style={styles.recommendation}>Popular</Text>
          <View
            style={selectedCategory === "Popular" ? styles.underline : {}}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={favoriteSongs}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={[styles.imageCard2]}
              onPress={() =>
                navigation.navigate("Details", {
                  baihatc: item,
                })
              }
            >
              <View style={styles.container2}>
                <View style={styles.imageCard2}>
                  <Image
                    source={{
                      uri: "http://192.168.1.30:3000/images/" + item.image,
                    }}
                    style={{
                      borderRadius: PixelRatio.roundToNearestPixel(15),
                      width: PixelRatio.roundToNearestPixel(60),
                      height: PixelRatio.roundToNearestPixel(60),
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.text_recommendation}>{item.title}</Text>
                  <Text style={styles.text_recommendation2}>{item.artist}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03174B",
  },
  container2: {
    flexDirection: "row",
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
  touchable: {
    // Styles của TouchableOpacity
  },
  searchIcon: {
    width: PixelRatio.roundToNearestPixel(35),
    height: PixelRatio.roundToNearestPixel(35),
  },
  categories: {
    fontFamily: 'Sura-Bold',
    marginTop: PixelRatio.roundToNearestPixel(15),
    marginLeft: PixelRatio.roundToNearestPixel(20),
    color: "white",
    fontSize: PixelRatio.roundToNearestPixel(22),
  },
  recommendation: {
    fontFamily: 'Sura-Bold',
    marginTop: PixelRatio.roundToNearestPixel(15),
    marginLeft: PixelRatio.roundToNearestPixel(20),
    color: "white",
    fontSize: PixelRatio.roundToNearestPixel(22),
  },
  gradient: {
    position: "absolute",
    top: PixelRatio.roundToNearestPixel(0),
    left: PixelRatio.roundToNearestPixel(0),
    right: PixelRatio.roundToNearestPixel(0),
    bottom: PixelRatio.roundToNearestPixel(0),
  },
  imageCard: {
    width: PixelRatio.roundToNearestPixel(130),
    marginLeft: PixelRatio.roundToNearestPixel(30),
    marginTop: PixelRatio.roundToNearestPixel(10),
  },

  imageCard2: {
    marginLeft: PixelRatio.roundToNearestPixel(15),
    marginTop: PixelRatio.roundToNearestPixel(5),
  },

  text: {
    color: "white",
    fontSize: PixelRatio.roundToNearestPixel(15),
    textAlign: "center",
    marginTop: PixelRatio.roundToNearestPixel(5),
    fontFamily: 'Sura-Bold',
  },
  text_recommendation: {
    color: "#ffffff",
    fontSize: PixelRatio.roundToNearestPixel(16),
    marginTop: PixelRatio.roundToNearestPixel(14),
    marginLeft: PixelRatio.roundToNearestPixel(30),
    fontFamily: 'Sura-Bold',
  },
  text_recommendation2: {
    color: "#ffffff",
    fontSize: PixelRatio.roundToNearestPixel(14),
    marginTop: PixelRatio.roundToNearestPixel(2),
    marginLeft: PixelRatio.roundToNearestPixel(30),
    fontFamily: 'Sura-Regular',
  },
  underline: {
    height: PixelRatio.roundToNearestPixel(1),
    backgroundColor: "#ffffff",
    marginTop: PixelRatio.roundToNearestPixel(5),
    marginLeft: PixelRatio.roundToNearestPixel(20),
  },
});
export default Categories;
//his