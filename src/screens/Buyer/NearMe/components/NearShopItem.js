import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../../../../shared/theme/Colors";

const defaultAvatar =
  "https://img.freepik.com/premium-vector/online-shop-logo-designs-concept-vector-online-store-logo-designs_7649-661.jpg?w=2000";

export default function NearShopItem({ item }) {
  const navigation = useNavigation();

  const handleSelectShop = () => {
    navigation.navigate("NearShop", { shopId: item.id });
  };

  function convertDistance(distance) {
    if (distance >= 1) {
      return distance.toFixed(2).toString() + " km";
    } else {
      const meters = distance * 1000;
      return meters.toFixed(2).toString() + " m";
    }
  }

  return (
    <TouchableOpacity style={styles.nearShopItem} onPress={handleSelectShop}>
      <View style={styles.nearShopItem__imageContainer}>
        <Image
          className="rounded-full"
          style={styles.nearShopItem__image}
          source={{ uri: item.imageUrl ? item.imageUrl : defaultAvatar }}
          resizeMode="cover"
        />
      </View>
      <View>
        <Text style={styles.nearShopItem__name}>{item.storeName}</Text>
        <Text style={styles.nearShopItem__distance}>
          {convertDistance(item.distance)} away
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nearShopItem: {
    flexDirection: "row",
    backgroundColor: Colors.gray,
    padding: 10,
    borderRadius: 4,
    marginVertical: 5,
    alignItems: "center",
  },
  nearShopItem__imageContainer: {
    marginRight: 10,
    borderRightColor: Colors.primaryDark,
    borderRightWidth: 1,
    paddingRight: 10,
  },
  nearShopItem__image: {
    height: 60,
    width: 60,
  },
  nearShopItem__name: {
    fontWeight: "500",
    fontSize: 15,
    marginBottom: 2,
  },
  nearShopItem__distance: {
    fontStyle: "italic",
    fontSize: 12,
    opacity: 0.8,
  },
});
