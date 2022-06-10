import React from "react";
import { ImageBackground } from "react-native";

export default function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.replace("Login");
  }, 500);
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../assets/splash.gif")}
    />
  );
}
