import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, PixelRatio } from "react-native";
import { HomeStackNavigator } from "./HomeStackNavigator";
import Account from "../src/Account"
import Play from "../src/Play";
const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#042068',
    height: PixelRatio.roundToNearestPixel(65),
    bottom: PixelRatio.roundToNearestPixel(10),
    position: 'absolute',
    borderRadius: PixelRatio.roundToNearestPixel(50),
    marginHorizontal: PixelRatio.roundToNearestPixel(16),
    borderTopWidth: PixelRatio.roundToNearestPixel(0),
  },
  tabBarActiveTintColor: '#DD27CB',
  tabBarInactiveTintColor: '#D9D9D9',
};

const tabBarOptionsStyle = {
  showLabel: false,
}
const BottomTabNavigator = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={screenOptionStyle}
    >
      <Tab.Screen name="Library" component={HomeStackNavigator} 
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image style={{
                tintColor: focused ? '#DD27CB' : '#D9D9D9',
                marginBottom: PixelRatio.roundToNearestPixel(0),
              }}
                source={require('../assets/images/lib2.png')}
              />
            )
          }
        }}
      />
      <Tab.Screen name="Play" component={Play}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image style={{
                tintColor: focused ? '#DD27CB' : '#D9D9D9',
                marginBottom: PixelRatio.roundToNearestPixel(0),
              }}
                source={require('../assets/images/headphones.png')}
              />
            )
          }
        }} />
      <Tab.Screen name="Account" component={Account}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Image style={{
                tintColor: focused ? '#DD27CB' : '#D9D9D9',
                marginBottom: PixelRatio.roundToNearestPixel(0),
              
              }}
                source={require('../assets/images/user.png')}
              />
            )
          }
        }} />

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
