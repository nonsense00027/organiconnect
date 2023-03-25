import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Shop from "../screens/Buyer/Home/Shop";
import Home from "../screens/Buyer/Home/Home";
import Product from "../screens/Product/Product";

const Stack = createStackNavigator();

export const BuyerHomeRoute = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen
        name="Product"
        component={Product}
        options={({ route }) => ({ title: route.params.productName })}
      />
    </Stack.Navigator>
  );
};
