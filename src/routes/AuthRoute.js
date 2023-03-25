import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Welcome from "../screens/AuthScreens/Welcome";

import { BuyerAuthRoute } from "./BuyerAuthRoute";
import { SellerAuthRoute } from "./SellerAuthRoute";

const Stack = createStackNavigator();

export const AuthRoute = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen name="Buyer" component={BuyerAuthRoute} />
        <Stack.Screen name="Seller" component={SellerAuthRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
