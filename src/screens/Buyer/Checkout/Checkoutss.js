import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Colors from "../../../shared/theme/Colors";

export default function Checkout() {
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [barangay, setBarangay] = useState("");
  const [landmarks, setLandmarks] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "pan"}
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.orderDetails}>
          <Text style={{ fontSize: 50 }}>
            RNCSafeAreaView
            http://192.168.68.103:19000/node_modules/expo/AppEntry.bundle?platform=android&dev=true&hot=false:151753:21
            App@http://192.168.68.103:19000/node_modules/expo/AppEntry.bundle?platform=android&dev=true&hot=false:99121:44
            withDevTools(App)@http://192.168.68.103:19000/node_modules/expo/AppEntry.bundle?platform=android&dev=true&hot=false:98877:27
            RCTView
          </Text>
          <TextInput
            style={styles.login__formTextInput}
            autoFocus
            onChangeText={(val) => setStreet(val)}
            value={street}
            placeholder="Street"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  orderDetails: {
    padding: 20,
    backgroundColor: Colors.white,
    flex: 1,
  },
  orderDetails__title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  orderDetails__orderLists: {
    marginTop: 5,
  },
  orderDetails__orderNameContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  orderDetails__orderName: {
    fontSize: 14,
    marginRight: 7,
  },
  orderDetails__orderQtyContainer: {
    flex: 0.15,
  },
  orderDetails__orderQty: {
    opacity: 0.7,
    fontSize: 13,
  },
  orderDetails__order: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  orderDetails__orderPrice: {
    fontWeight: "600",
  },
  checkout__address: {},
  login__formTextInput: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: Colors.input,
    borderRadius: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  cart__checkoutButton: {
    backgroundColor: Colors.primary,
  },
  cart__checkoutButtonTitle: {
    fontWeight: "bold",
  },
});
