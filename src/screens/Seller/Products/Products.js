import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../../configs/firebase/firebase";

import { useAuthContext } from "../../../context/AuthContext";

import Colors from "../../../shared/theme/Colors";
import { collectIdsAndDocs } from "../../../shared/utilities";

import ProductList from "./components/ProductList";

export default function Products() {
  const { user } = useAuthContext();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productRef = collection(db, "products");

    const q = query(productRef, where("storeId", "==", user.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setProducts(querySnapshot.docs.map(collectIdsAndDocs));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.products}>
      <ProductList data={products} />
    </View>
  );
}

const styles = StyleSheet.create({
  products: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
});
