import { Button, Icon } from "@rneui/base";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { db } from "../../../configs/firebase/firebase";
import { useCartContext } from "../../../context/CartContext";
import { useAuthContext } from "../../../context/AuthContext";
import Colors from "../../../shared/theme/Colors";
import CartsList from "./components/CartsList";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const navigation = useNavigation();

  const { cart, resetCart } = useCartContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const getStoreId = () => cart[0].storeId;

  const getTotalAmountToPay = () =>
    cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);

  const handleCheckout = () => {
    navigation.navigate("Checkout");
  };
  // const handleCheckout = async () => {
  //   setLoading(true);
  //   try {
  //     const orderRef = collection(db, "users", getStoreId(), "orders");

  //     const docRef = await addDoc(orderRef, {
  //       buyer: user,
  //       orders: cart,
  //       amountToPay: getTotalAmountToPay(),
  //       timestamp: serverTimestamp(),
  //     });

  //     resetCart();

  //     navigation.navigate("OrderDetails", {
  //       orderId: docRef.id,
  //       storeId: getStoreId(),
  //     });
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  if (cart.length < 1) {
    return (
      <View style={styles.cart__empty}>
        <Icon name="closesquare" type="antdesign" />
        <Text style={{ fontWeight: "500", fontSize: 18, marginTop: 10 }}>
          Your cart is empty.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.cart}>
      <CartsList data={cart} />

      <View style={styles.cart__bottomContainer}>
        <Text style={{ fontSize: 16 }}>Total Amount</Text>
        <Text style={styles.cart__amountToPay}>₱ {getTotalAmountToPay()}</Text>
      </View>
      <Button
        title="Proceed to Checkout"
        containerStyle={{ flex: 1 }}
        buttonStyle={styles.cart__checkoutButton}
        titleStyle={styles.cart__checkoutButtonTitle}
        onPress={handleCheckout}
        loading={loading}
      />
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cart: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  cart__empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  cart__bottomContainer: {
    marginTop: 50,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cart__amountToPay: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cart__checkoutButton: {
    backgroundColor: Colors.primary,
  },
  cart__checkoutButtonTitle: {
    fontWeight: "bold",
  },
});
