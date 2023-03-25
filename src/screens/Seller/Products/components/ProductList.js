import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import ProductItem from "./ProductItem";

export default function ProductList({ data, action }) {
  const renderItem = ({ item }) => <ProductItem item={item} action={action} />;

  return (
    <View>
      <FlatList
        nestedScrollEnabled
        // ItemSeparatorComponent={() => (
        //   <View style={{ width: 10, backgroundColor: "transparent" }} />
        // )}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={data}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
