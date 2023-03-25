import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Cart from "../screens/Buyer/Cart/Cart";
import Checkout from "../screens/Buyer/Checkout/Checkout";

const Stack = createStackNavigator();

export const CartRoute = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={{
        unmountOnBlur: true,
      }}
    >
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
};
