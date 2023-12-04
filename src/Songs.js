import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, PixelRatio, StatusBar } from "react-native";
import axios from "axios";

export default function Songs({ route, navigation }) {
  const { loaibaihatchon } = route.params;
  const [baihatchon, getBaihattheoloai] = React.useState();

  const getapibaihattheoloai = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.30:3000/api/songs/" + loaibaihatchon.language
      );
      getBaihattheoloai(response.data);
    } catch (error) {
      alert(error.message);
      console.error('Error', error);
    }
  };
  React.useEffect(() => {
    getapibaihattheoloai();
  }, []);

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
      <Text style={styles.title}>{loaibaihatchon.tenloai}</Text>
      <Image
        source={{
          uri: "http://192.168.1.30:3000/images/" + loaibaihatchon.image,
        }}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: PixelRatio.roundToNearestPixel(10),
          marginBottom: PixelRatio.roundToNearestPixel(15),
          width: PixelRatio.roundToNearestPixel(350),
          height: PixelRatio.roundToNearestPixel(300),
          borderRadius: PixelRatio.roundToNearestPixel(15),
        }}
      />
      <FlatList
        data={baihatchon}
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
  container2: {
    flexDirection: "row",
  },
  text: {
    color: "orange",
    fontSize: PixelRatio.roundToNearestPixel(20),
    textAlign: "center",
  },
  title: {
    color: "white",
    fontSize: PixelRatio.roundToNearestPixel(30),
    textAlign: "center",
    marginTop: PixelRatio.roundToNearestPixel(10),
  },
  mota: {
    color: "black",
    fontSize: PixelRatio.roundToNearestPixel(20),
    textAlign: "center",
  },
  imageCard2: {
    marginLeft: PixelRatio.roundToNearestPixel(15),
    marginTop: PixelRatio.roundToNearestPixel(5),
  },
  text_recommendation: {
    color: "#ffffff",
    fontSize: PixelRatio.roundToNearestPixel(14),
    marginTop: PixelRatio.roundToNearestPixel(20),
    marginLeft: PixelRatio.roundToNearestPixel(30),
    fontWeight: "bold",
  },
  text_recommendation2: {
    color: "#ffffff",
    fontSize: PixelRatio.roundToNearestPixel(12),
    marginTop: PixelRatio.roundToNearestPixel(3),
    marginLeft: PixelRatio.roundToNearestPixel(30),
  },

});


