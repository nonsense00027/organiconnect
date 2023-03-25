import { StackActions, useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ToastAndroid,
} from "react-native";
import { db } from "../../../configs/firebase/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import { useCartContext } from "../../../context/CartContext";
import Colors from "../../../shared/theme/Colors";
import { hasBlank } from "../../../shared/utilities";

export default function Checkout() {
  const navigation = useNavigation();

  const { cart, resetCart } = useCartContext();
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [barangay, setBarangay] = useState("");
  const [landmarks, setLandmarks] = useState("");

  const getStoreId = () => cart[0].storeId;

  const getTotalAmountToPay = () =>
    cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const orderRef = collection(db, "orders");

      const docRef = await addDoc(orderRef, {
        buyer: {
          ...user,
          houseNumber,
          street,
          province,
          city,
          barangay,
          landmarks,
        },
        orders: cart,
        amountToPay: getTotalAmountToPay(),
        timestamp: serverTimestamp(),
        store: getStoreId(),
      });

      resetCart();

      navigation.navigate("OrderDetails", {
        orderId: docRef.id,
        storeId: getStoreId(),
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const hasEmpty = () => {
    return hasBlank([province, city, barangay]);
  };

  useEffect(() => {
    if (cart.length < 1) {
      navigation.dispatch(StackActions.popToTop());
    }
  }, [cart]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "pan"}
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.white }}
        contentContainerStyle={{ backgroundColor: Colors.white }}
      >
        <View style={styles.orderDetails}>
          <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 15 }}>
            Order Summary
          </Text>
          {cart?.map((item) => (
            <View key={item.id} style={styles.orderDetails__order}>
              <View style={styles.orderDetails__orderQtyContainer}>
                <Text style={styles.orderDetails__orderQty}>
                  {item.quantity} x
                </Text>
              </View>
              <View style={styles.orderDetails__orderNameContainer}>
                <Text style={styles.orderDetails__orderName}>
                  {item.productName}
                </Text>
              </View>
              <View>
                <Text style={styles.orderDetails__orderPrice}>
                  ₱ {item.totalPrice.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: "500" }}>
              Amount to pay
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "right",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              ₱ {getTotalAmountToPay()}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: Colors.gray,
              marginVertical: 30,
            }}
          />

          <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>
            Address Details
          </Text>

          <TextInput
            style={styles.login__formTextInput}
            autoFocus
            onChangeText={(val) => setStreet(val)}
            value={street}
            placeholder="Street"
          />
          <TextInput
            style={styles.login__formTextInput}
            onChangeText={(val) => setHouseNumber(val)}
            value={houseNumber}
            placeholder="House No."
          />
          <TextInput
            style={styles.login__formTextInput}
            onChangeText={(val) => setBarangay(val)}
            value={barangay}
            placeholder="Barangay"
          />
          <TextInput
            style={styles.login__formTextInput}
            onChangeText={(val) => setCity(val)}
            value={city}
            placeholder="City"
          />
          <TextInput
            style={styles.login__formTextInput}
            onChangeText={(val) => setProvince(val)}
            value={province}
            placeholder="Province"
          />
          <TextInput
            style={styles.login__formTextInput}
            onChangeText={(val) => setLandmarks(val)}
            value={landmarks}
            placeholder="Landmarks"
          />

          <Button
            title="Confirm Order"
            //   containerStyle={{ flex: 1 }}
            buttonStyle={styles.cart__checkoutButton}
            titleStyle={styles.cart__checkoutButtonTitle}
            onPress={handleCheckout}
            loading={loading}
            disabled={hasEmpty()}
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
