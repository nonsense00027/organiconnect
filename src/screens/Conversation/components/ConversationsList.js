import React from "react";
import { StyleSheet, FlatList } from "react-native";
import ConversationItem from "./ConversationItem";

const ConversationsList = ({ data }) => {
  const renderItem = ({ item }) => <ConversationItem item={item} />;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      inverted
    />
  );
};

export default ConversationsList;

const styles = StyleSheet.create({});
