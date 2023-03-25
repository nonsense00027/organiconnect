import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import OrderItem from "./OrderItem";

export default function OrderLists({ data, action }) {
  const renderItem = ({ item }) => <OrderItem item={item} action={action} />;

  return (
    <View>
      <FlatList
        // nestedScrollEnabled
        // ItemSeparatorComponent={() => (
        //   <View style={{ width: 10, backgroundColor: "transparent" }} />
        // )}
        data={data}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
