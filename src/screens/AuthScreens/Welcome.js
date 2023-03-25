import React from "react";
import { Button } from "@rneui/themed";
import { Image, StyleSheet, Text, View } from "react-native";

import Colors from "../../shared/theme/Colors";
import Texts from "../../shared/theme/Texts";

import logo from "../../assets/img/logo.png";

export default function Welcome({ navigation }) {
  return (
    <View style={styles.welcome}>
      <View className="flex-1 items-center justify-center">
        <Image source={logo} className="h-60" resizeMode="contain" />
        <Text style={styles.welcome__title}>OrganiConnect</Text>
        <Text style={styles.welcome__subtitle}>
          Organic products at your fingertips.
        </Text>
      </View>
      <View style={{ flex: 0.5 }}>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            textAlign: "center",
            marginBottom: 10,
            fontSize: 18,
          }}
        >
          Are you
        </Text>
        <Button
          title="Buyer"
          buttonStyle={styles.welcome__button__buyer}
          titleStyle={styles.welcome__buttonText}
          onPress={() => navigation.navigate("Buyer", { screen: "Login" })}
        />
        <Button
          title="Seller"
          buttonStyle={styles.welcome__button__seller}
          titleStyle={styles.welcome__buttonText}
          onPress={() => navigation.navigate("Seller", { screen: "Login" })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: { flex: 1, paddingHorizontal: 20, backgroundColor: "#fff" },
  welcome__button__buyer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 17,
    borderRadius: 38,
    marginVertical: 5,
  },
  welcome__button__seller: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 17,
    borderRadius: 38,
    marginVertical: 5,
  },
  welcome__title: {
    textAlign: "center",
    fontSize: Texts.title,
    color: "black",
    fontFamily: "Oswald-SemiBold",
  },
  welcome__subtitle: {
    textAlign: "center",
    fontSize: Texts.subtitle,
    marginTop: 5,
    color: "black",
    fontFamily: "Roboto-Regular",
  },
  welcome__buttonText: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "#fff",
    fontFamily: "Roboto-Bold",
  },
  welcome__login: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  welcome__loginButtonText: {
    textTransform: "uppercase",
    color: Colors.primary,
    marginLeft: 5,
    fontFamily: "Roboto-Black",
  },
});
