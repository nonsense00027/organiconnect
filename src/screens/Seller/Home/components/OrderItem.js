import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../../../../shared/theme/Colors";

export default function OrderItem({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.orderItem}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("Details", {
          ...item,
        });
      }}
    >
      <View>
        <Text>
          Order #{item.id.split("").slice(0, 6).join("").toUpperCase()}
        </Text>
        <Text style={styles.orderItem__date}>
          {moment(new Date(item.timestamp.toDate())).startOf("min").fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: Colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 3,
  },
  orderItem__date: {
    fontSize: 12,
    fontStyle: "italic",
  },
});
