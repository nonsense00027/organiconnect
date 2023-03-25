import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Seller/Home/Home";
import OrderDetails from "../screens/Seller/OrderDetails/OrderDetails";

const Stack = createStackNavigator();

export const SellerHomeRoute = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={OrderDetails} />
    </Stack.Navigator>
  );
};
