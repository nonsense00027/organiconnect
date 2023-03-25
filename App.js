import "react-native-gesture-handler";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Main from "./src/Main";

import { AuthProvider } from "./src/context/AuthContext";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("./src/assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    Oswald: require("./src/assets/fonts/Oswald.ttf"),
    "Oswald-Bold": require("./src/assets/fonts/Oswald-Bold.ttf"),
    "Oswald-Medium": require("./src/assets/fonts/Oswald-Medium.ttf"),
    "Oswald-SemiBold": require("./src/assets/fonts/Oswald-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </View>
    </SafeAreaView>
  );
}
