import { Icon } from "@rneui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../shared/theme/Colors";

import AddProduct from "../screens/Seller/AddProduct/AddProduct";
import Products from "../screens/Seller/Products/Products";
import Profile from "../screens/Seller/Profile/Profile";
import Chat from "../screens/Buyer/Chat/Chat";

import { SellerHomeRoute } from "./OrderRoute";

const Tab = createBottomTabNavigator();

const screens = [
  {
    name: "SellerHome",
    iconType: "entypo",
    iconName: "shop",
    component: SellerHomeRoute,
    headerShown: false,
  },
  { name: "Chat", iconType: "entypo", iconName: "chat", component: Chat },
  {
    name: "Add Product",
    iconType: "entypo",
    iconName: "squared-plus",
    component: AddProduct,
  },
  {
    name: "Products",
    iconType: "material-icons",
    iconName: "shopping-bag",
    component: Products,
  },
  {
    name: "Profile",
    iconType: "font-awesome",
    iconName: "user",
    component: Profile,
  },
];
export const SellerRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabel: () => null,
        tabBarActiveBackgroundColor: Colors.primary,
      }}
    >
      {screens.map(({ name, iconName, iconType, component, headerShown }) => (
        <Tab.Screen
          key={name}
          name={name}
          options={{
            headerShown,
            tabBarIcon: ({ focused }) => (
              <Icon
                type={iconType}
                name={iconName}
                size={26}
                color={focused ? Colors.white : Colors.gray}
              />
            ),
          }}
          component={component}
        />
      ))}
    </Tab.Navigator>
  );
};
