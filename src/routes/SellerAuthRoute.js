import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/AuthScreens/Seller/Login";
import Register from "../screens/AuthScreens/Seller/Register";

const Stack = createStackNavigator();

export const SellerAuthRoute = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
