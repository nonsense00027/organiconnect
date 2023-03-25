import { Avatar, Button } from "@rneui/base";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { auth } from "../../../configs/firebase/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import Colors from "../../../shared/theme/Colors";

export default function Profile() {
  const { user } = useAuthContext();

  console.log(user);
  return (
    <View style={styles.profile}>
      <View>
        <View style={styles.profile__avatar}>
          <Avatar
            size={120}
            rounded
            title={user.firstname.split("").slice(0, 2).join("")}
            containerStyle={{ backgroundColor: Colors.primary }}
          />
        </View>
        <View style={styles.profile__info}>
          <Text style={styles.profile__name}>
            {user.firstname} {user.lastname}
          </Text>
          <Text style={{ marginVertical: 5 }}>📧 {user.email}</Text>
          <Text>📞 {user.phoneNumber}</Text>
        </View>
      </View>
      <Button
        title="Logout"
        buttonStyle={{ backgroundColor: Colors.secondary }}
        onPress={() => {
          signOut(auth);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  profile__avatar: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  profile__info: {
    alignItems: "center",
  },
  profile__name: {
    fontSize: 22,
    fontWeight: "500",
  },
});
