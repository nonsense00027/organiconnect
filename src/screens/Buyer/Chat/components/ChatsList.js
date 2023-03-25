import React from "react";
import { Text, View, FlatList } from "react-native";
import ChatItem from "./ChatItem";

const ChatsList = ({ data }) => {
  const renderItem = ({ item }) => <ChatItem item={item} />;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="h-2"></View>}
      renderItem={renderItem}
    />
  );
};

export default ChatsList;
