import React from "react";
import { StyleSheet, View } from "react-native";

import { useAuthContext } from "./context/AuthContext";

import LoadingScreen from "./components/LoadingScreen";

import { AuthRoute } from "./routes/AuthRoute";
import { HomeRoute } from "./routes/HomeRoute";
import { CartContextProvider } from "./context/CartContext";

const getScreen = (user) => {
  if (user) {
    return (
      <CartContextProvider>
        <HomeRoute />
      </CartContextProvider>
    );
  } else {
    return <AuthRoute />;
  }
};
export default function Main() {
  const { user, authLoading } = useAuthContext();

  if (authLoading) {
    return <LoadingScreen />;
  }

  return <View style={styles.main}>{getScreen(user)}</View>;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
