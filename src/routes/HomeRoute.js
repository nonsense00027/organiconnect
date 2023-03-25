import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { useAuthContext } from "../context/AuthContext";

import { BuyerRoute } from "./BuyerRoute";
import { SellerRoute } from "./SellerRoute";

import Conversation from "../screens/Conversation/Conversation";
import OrderDetails from "../screens/OrderDetails/OrderDetails";
import UploadCredentials from "../screens/Seller/UploadCredentials/UploadCredentials";
import Pending from "../screens/Seller/Pending/Pending";

const Stack = createStackNavigator();

export const HomeRoute = ({}) => {
  const { user } = useAuthContext();

  if (user.role === "buyer") {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Main"
        >
          <Stack.Screen name="Main" component={BuyerRoute} />
          <Stack.Screen name="Conversation" component={Conversation} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    if (!user.credentials) {
      return <UploadCredentials />;
    } else {
      if (!user.approved) {
        return <Pending />;
      } else {
        return (
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Main"
            >
              <Stack.Screen name="Main" component={SellerRoute} />
              <Stack.Screen name="Conversation" component={Conversation} />
              <Stack.Screen name="OrderDetails" component={OrderDetails} />
            </Stack.Navigator>
          </NavigationContainer>
        );
      }
    }
  }
};
