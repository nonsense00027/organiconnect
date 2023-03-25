import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import NearShopItem from "./NearShopItem";

export default function NearShopsList({ items }) {
  const renderItem = ({ item }) => <NearShopItem item={item} />;

  return (
    <View>
      <FlatList
        ItemSeparatorComponent={() => <View className="w-2" />}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
