import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthContext } from "../../../context/AuthContext";

const ConversationItem = ({ item }) => {
  const { user } = useAuthContext();
  return (
    <View
      className={`
        ${
          user.id === item.user
            ? "self-end bg-gray-300"
            : "self-start border-white bg-green-500"
        } px-6 rounded-xl py-2 mx-2 my-1
        `}
    >
      <Text style={`${user.id === item.user ? "text-gray-700" : "text-white"}`}>
        {item.message}
      </Text>
    </View>
  );
};

export default ConversationItem;

const styles = StyleSheet.create({});
