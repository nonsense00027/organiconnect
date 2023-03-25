import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Product from "../screens/Product/Product";
import NearMe from "../screens/Buyer/NearMe/NearMe";
import NearShop from "../screens/Buyer/NearMe/NearShop";

const Stack = createStackNavigator();

export const NearbyRoute = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Nearby">
      <Stack.Screen name="Nearby" component={NearMe} />
      <Stack.Screen
        name="NearShop"
        options={{ headerTitle: "Shop" }}
        component={NearShop}
      />
      <Stack.Screen
        name="NearShopProduct"
        component={Product}
        options={({ route }) => ({ title: route.params.productName })}
      />
    </Stack.Navigator>
  );
};
