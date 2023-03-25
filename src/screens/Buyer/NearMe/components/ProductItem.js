import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../../../../shared/theme/Colors";

export default function ProductItem({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.productItem}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("NearShopProduct", {
          ...item,
        });
      }}
    >
      <View style={styles.productItem__imageContainer}>
        <Image
          source={{ uri: item.imageUrls[0] }}
          style={styles.productItem__image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.productItem__details}>
        <Text>{item.productName}</Text>
        <Text>₱ {parseFloat(item.price).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productItem: {
    flex: 0.5,
    margin: 5,
    backgroundColor: Colors.gray,
    borderRadius: 4,
  },
  productItem__imageContainer: {
    width: "100%",
    height: 170,
  },
  productItem__image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  productItem__details: {
    padding: 10,
  },
});
