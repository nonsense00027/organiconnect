import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ToastAndroid,
} from "react-native";
import { db } from "../../configs/firebase/firebase";
import Colors from "../../shared/theme/Colors";

export default function OrderDetails() {
  const route = useRoute();
  const navigation = useNavigation();

  const { orderId, storeId } = route.params;

  const [order, setOrder] = useState(null);
  const [store, setStore] = useState(null);

  const fetchOrder = async () => {
    const orderRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(orderRef);
    setOrder({ id: docSnap.id, ...docSnap.data() });
  };

  const fetchStore = async () => {
    const storeRef = doc(db, "users", storeId);
    const docSnap = await getDoc(storeRef);
    setStore({ id: docSnap.id, ...docSnap.data() });
  };

  useEffect(() => {
    fetchOrder();
    fetchStore();
  }, []);

  if (!order) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <View style={styles.orderDetails}>
      <Text style={styles.orderDetails__title}>
        Order #{orderId.split("").slice(0, 6).join("").toUpperCase()}
      </Text>

      <View style={styles.orderDetails__orderLists}>
        <Text style={{ marginBottom: 10, fontWeight: "500", fontSize: 15 }}>
          Order Details
        </Text>
        {order?.orders?.map((item) => (
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
                ₱ {item.totalPrice}
              </Text>
            </View>
          </View>
        ))}

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>Amount to pay</Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            ₱ {order.amountToPay}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 50 }}>
        <Text style={{ marginBottom: 10, fontWeight: "500", fontSize: 15 }}>
          Buyer Details
        </Text>

        <View style={styles.orderDetails__buyerNameContainer}>
          <Text>Name</Text>
          <Text style={styles.orderDetails__buyerName}>
            {order.buyer.firstname} {order.buyer.lastname}
          </Text>
        </View>

        <View style={styles.orderDetails__buyerNameContainer}>
          <Text>Phone number</Text>
          <Text style={styles.orderDetails__buyerName}>
            {order.buyer.phoneNumber}
          </Text>
        </View>

        <View style={styles.orderDetails__buyerNameContainer}>
          <Text>Address</Text>
          <Text style={styles.orderDetails__buyerAddress}>
            {order.buyer.houseNumber}, {order.buyer.street},{" "}
            {order.buyer.barangay}, {order.buyer.city}, {order.buyer.province}
          </Text>
        </View>

        <View style={styles.orderDetails__buyerNameContainer}>
          <Text>Landmarks</Text>
          <Text style={styles.orderDetails__buyerName}>
            {order.buyer.landmarks}
          </Text>
        </View>

        <Button
          buttonStyle={{ backgroundColor: Colors.primary, marginTop: 50 }}
          title="Back to Home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
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
    marginTop: 30,
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

  orderDetails__buyerNameContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  orderDetails__buyerName: {
    flex: 1,
    textAlign: "right",
    fontWeight: "500",
  },
  orderDetails__buyerAddress: {
    flex: 1,
    textAlign: "right",
    fontWeight: "500",
    paddingLeft: 20,
  },
});
