import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { doc, getDoc } from "firebase/firestore";

import LoadingScreen from "../../../components/LoadingScreen";

import { db } from "../../../configs/firebase/firebase";

import { useAuthContext } from "../../../context/AuthContext";

import Colors from "../../../shared/theme/Colors";
import { formatConversationId } from "../../../shared/utilities";

export default function OrderDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = useAuthContext();

  const { id: orderId } = route.params;

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    const orderRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(orderRef);
    setOrder({ id: docSnap.id, ...docSnap.data() });
    setLoading(false);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleMessage = () => {
    navigation.navigate("Conversation", {
      conversationId: formatConversationId(user.id, order.buyer.id),
      storeName: order.buyer.firstname,
      shopId: order.buyer.id,
    });
  };

  if (loading || !order) return <LoadingScreen />;

  return (
    <View style={styles.orderDetails}>
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

      <View style={{ marginTop: 40 }}>
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
            {order.buyer.houseNumber}, {order.buyer.street},
            {order.buyer.barangay}, {order.buyer.city}, {order.buyer.province}
          </Text>
        </View>

        <View style={styles.orderDetails__buyerNameContainer}>
          <Text>Landmarks</Text>
          <Text style={styles.orderDetails__buyerName}>
            {order.buyer.landmarks}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Button
          buttonStyle={{ backgroundColor: Colors.primary, paddingVertical: 10 }}
          title="Send a message"
          onPress={handleMessage}
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
