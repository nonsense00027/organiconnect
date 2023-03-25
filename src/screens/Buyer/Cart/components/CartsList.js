import React from "react";
import { Text, View, FlatList } from "react-native";
import CartItem from "./CartItem";

const CartsList = ({ data }) => {
  const renderItem = ({ item }) => <CartItem item={item} />;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default CartsList;
