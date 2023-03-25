import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ToastAndroid,
} from "react-native";
import { Button } from "@rneui/themed";
import Colors from "../../shared/theme/Colors";
import { useCartContext } from "../../context/CartContext";
import { serverTimestamp } from "firebase/firestore";

export default function Product() {
  const route = useRoute();

  const { imageUrls, productName, price, qty, storeId, id, description } =
    route.params;

  const { cart, addToCart } = useCartContext();

  const [quantity, setQuantity] = useState("0");

  const productInCart = () => cart.map((item) => item.id).includes(id);

  return (
    <View style={styles.product}>
      <Image
        style={styles.product__image}
        source={{ uri: imageUrls[0] }}
        resizeMode="cover"
      />
      <View style={styles.product__description}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.product__name}>{productName}</Text>
          <Text style={styles.product__price}>
            ₱ {parseFloat(price).toFixed(2)}
          </Text>
        </View>
        <Text style={{ fontSize: 15, marginTop: 15 }}>{description}</Text>
      </View>
      <View style={styles.product__actions}>
        <View style={styles.product__addToCart}>
          <Button
            title="-"
            buttonStyle={styles.product__addToCartQuantity}
            disabled={productInCart()}
            onPress={() => {
              if (quantity == 0) return;
              const newQty = parseInt(quantity) - 1;
              setQuantity(newQty.toString());
            }}
          />
          <TextInput
            style={styles.product__addToCartQuantityInput}
            keyboardType="numeric"
            value={quantity}
            onChangeText={(val) => setQuantity(val)}
            editable={!productInCart()}
          />
          <Button
            title="+"
            buttonStyle={styles.product__addToCartQuantity}
            disabled={productInCart()}
            onPress={() => {
              const newQty = parseInt(quantity) + 1;
              setQuantity(newQty.toString());
            }}
          />
          <Button
            title={productInCart() ? "Added" : "Add to cart"}
            buttonStyle={styles.product__addToCartButton}
            containerStyle={{ flex: 1, marginLeft: 10 }}
            disabled={productInCart()}
            onPress={() => {
              if (quantity == 0) return;

              addToCart({
                ...route.params,
                quantity,
                totalPrice: price * quantity,
                timestamp: serverTimestamp(),
              });

              setQuantity("0");

              ToastAndroid.showWithGravityAndOffset(
                "Product has been added to cart.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                0,
                50
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    flex: 1,
  },
  product__image: {
    height: 300,
    width: "100%",
    objectFit: "cover",
  },
  product__description: {
    padding: 10,
  },
  product__name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  product__price: {
    fontSize: 20,
  },
  product__actions: {
    paddingHorizontal: 10,
    marginTop: 50,
  },
  product__addToCart: {
    flexDirection: "row",
  },
  product__addToCartQuantity: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primary,
  },
  product__addToCartQuantityInput: {
    width: 60,
    height: 50,
    textAlign: "center",
    backgroundColor: Colors.white,
  },
  product__addToCartButton: {
    backgroundColor: Colors.primary,
    height: 50,
  },
});
