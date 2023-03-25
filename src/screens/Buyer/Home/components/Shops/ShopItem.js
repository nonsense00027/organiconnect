import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";

import Colors from "../../../../../shared/theme/Colors";

const defaultAvatar =
  "https://img.freepik.com/premium-vector/online-shop-logo-designs-concept-vector-online-store-logo-designs_7649-661.jpg?w=2000";

export default function ShopItem({ item }) {
  const navigation = useNavigation();

  const handleSelectShop = () => {
    navigation.navigate("Shop", { shopId: item.id });
  };

  return (
    <TouchableOpacity style={styles.shopItem} onPress={handleSelectShop}>
      <View style={styles.shopItem__imageContainer}>
        <Image
          className="rounded-full"
          style={styles.shopItem__image}
          source={{
            uri: item.profilePicture ? item.profilePicture : defaultAvatar,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.shopItem__details}>
        <Text style={styles.shopItem__name}>{item.storeName}</Text>
        <Text style={styles.shopItem__rating}>4.5🌟</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shopItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
    height: 200,
    width: 160,
  },
  shopItem__imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  shopItem__image: {
    width: 115,
    height: 115,
  },
  shopItem__details: {
    flex: 0.4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  shopItem__name: {
    fontFamily: "Roboto-Medium",
    marginTop: 5,
    fontSize: 16,
    flex: 1,
  },
  shopItem__rating: {
    fontSize: 13,
    color: Colors.black,
    textAlign: "center",
    marginTop: 5,
  },
});
