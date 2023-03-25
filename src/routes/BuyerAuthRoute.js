import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/AuthScreens/Buyer/Login";
import Register from "../screens/AuthScreens/Buyer/Register";

const Stack = createStackNavigator();

export const BuyerAuthRoute = ({}) => {
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
