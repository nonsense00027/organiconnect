import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { db } from "../../../configs/firebase/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import Colors from "../../../shared/theme/Colors";
import { collectIdsAndDocs } from "../../../shared/utilities";
import OrderLists from "./components/OrderLists";

export default function Home() {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = collection(db, "orders");

    const q = query(
      ordersRef,
      where("store", "==", user.id),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setOrders(querySnapshot.docs.map(collectIdsAndDocs));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: 10 }}
    >
      <OrderLists data={orders} action={() => null} />
    </View>
  );
}
