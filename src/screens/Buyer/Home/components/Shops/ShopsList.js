import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ShopItem from "./ShopItem";

export default function ShopsList({ items }) {
  const renderItem = ({ item }) => <ShopItem item={item} />;

  return (
    <View>
      <FlatList
        ItemSeparatorComponent={() => <View className="w-2" />}
        data={items}
        horizontal={true}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
