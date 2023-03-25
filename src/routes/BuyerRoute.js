import { Icon } from "@rneui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../shared/theme/Colors";

import Chat from "../screens/Buyer/Chat/Chat";
import Profile from "../screens/Buyer/Profile/Profile";

import { BuyerHomeRoute } from "./BuyerHomeRoute";
import { NearbyRoute } from "./NearbyRoute";
import { CartRoute } from "./CartRoute";

const Tab = createBottomTabNavigator();

const screens = [
  {
    name: "BuyerHome",
    iconType: "entypo",
    iconName: "shop",
    component: BuyerHomeRoute,
    headerShown: false,
  },
  { name: "Chat", iconType: "entypo", iconName: "chat", component: Chat },
  {
    name: "Near Me",
    iconType: "entypo",
    iconName: "location",
    component: NearbyRoute,
    headerShown: false,
  },
  {
    name: "Profile",
    iconType: "font-awesome",
    iconName: "user",
    component: Profile,
  },
  {
    name: "BuyerCart",
    iconType: "entypo",
    iconName: "shopping-cart",
    component: CartRoute,
    headerShown: false,
  },
];
export const BuyerRoute = () => {
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
