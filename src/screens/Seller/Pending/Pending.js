import { Image, StyleSheet, Text, View } from "react-native";

import pending from "../../../assets/img/pending.png";

import Texts from "../../../shared/theme/Texts";

export default function Pending() {
  return (
    <View style={styles.pending}>
      <Image source={pending} className="h-60" resizeMode="contain" />
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={styles.pending__title}>Your application is pending</Text>
        <Text>Please wait for the Admin's Approval</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pending: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pending__title: {
    fontFamily: "Roboto-Bold",
    fontSize: Texts.title,
  },
  pending__desc: {
    fontFamily: "Roboto-Regular",
    fontSize: Texts.subtitle,
  },
});
