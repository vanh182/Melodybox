import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../src/Home";
import Songs from "../src/Songs";
import Details from "../src/Details";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown:false
};


const HomeStackNavigator = () => {
  return (
    <Stack.Navigator 
    screenOptions={screenOptionStyle} >
      <Stack.Screen name="Home" component={Home}  />
      <Stack.Screen name="Songs" component={Songs} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};



export { HomeStackNavigator};

