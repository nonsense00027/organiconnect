import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Colors from "../../../../shared/theme/Colors";
import { Button, Icon } from "@rneui/themed";
import { useCartContext } from "../../../../context/CartContext";

const CartItem = ({ item }) => {
  const {
    editProductQuantity,
    addProductQuantity,
    subtractProductQuantity,
    removeFromCart,
  } = useCartContext();

  return (
    <View style={styles.cartItem}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text>{item.productName}</Text>
          <Text style={styles.cart__productPrice}>
            ₱ {parseFloat(item.totalPrice).toFixed(2)}
          </Text>
        </View>

        {/* ACTIONS */}
        <View style={styles.product__addToCart}>
          <Button
            title="-"
            buttonStyle={styles.product__addToCartQuantity}
            onPress={() => {
              if (item.quantity == 1) return;
              subtractProductQuantity(item.id);
            }}
          />
          <TextInput
            style={styles.product__addToCartQuantityInput}
            keyboardType="numeric"
            value={item.quantity.toString()}
            // onChangeText={(val) => setQuantity(val)}
          />
          <Button
            title="+"
            buttonStyle={styles.product__addToCartQuantity}
            onPress={() => {
              addProductQuantity(item.id);
            }}
          />
          <Button
            type="solid"
            buttonStyle={styles.cartItem__remove}
            onPress={() => removeFromCart(item)}
          >
            <Icon name="delete" color="white" iconStyle={{ fontSize: 15 }} />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  cart: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
  cart__productPrice: {
    fontWeight: "bold",
    marginTop: 5,
  },
  product__addToCart: {
    flexDirection: "row",
  },
  product__addToCartQuantity: {
    width: 35,
    height: 35,
    backgroundColor: Colors.primary,
  },
  product__addToCartQuantityInput: {
    width: 40,
    height: 35,
    textAlign: "center",
    backgroundColor: Colors.white,
  },
  cartItem__remove: {
    width: 35,
    height: 35,
    backgroundColor: "#C70000",
    marginLeft: 5,
  },
});
