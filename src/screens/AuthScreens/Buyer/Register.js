import React, { useState } from "react";
import styles from "../styles";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "@rneui/themed";
import { hasBlank } from "../../../shared/utilities";
import { auth, db } from "../../../configs/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", user.uid), {
        email,
        firstname,
        lastname,
        phoneNumber,
        role: "buyer",
      });
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        `${err.message.split("]")[1]}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50
      );
      setLoading(false);
    }
  };

  const hasEmpty = () => {
    return hasBlank([firstname, lastname, email, password]);
  };

  return (
    <KeyboardAvoidingView
      //   behavior={Platform.OS === "ios" ? "padding" : "height"}
      behavior={Platform.OS === "ios" ? "padding" : "pan"}
      //   keyboardVerticalOffset={50}
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ backgroundColor: "#fff" }}
    >
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.login}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.login__header}>
              <Text style={styles.login__title}>Create your account</Text>
            </View>
            <View style={styles.login__error}>
              {error && <Text style={styles.login__errorText}>{error}</Text>}
            </View>

            <TextInput
              style={styles.login__formTextInput}
              autoFocus
              onChangeText={(val) => setFirstname(val)}
              value={firstname}
              placeholder="First name"
            />
            <TextInput
              style={styles.login__formTextInput}
              onChangeText={(val) => setLastname(val)}
              value={lastname}
              placeholder="Last name"
            />

            <TextInput
              style={styles.login__formTextInput}
              onChangeText={(val) => setPhoneNumber(val)}
              value={phoneNumber}
              placeholder="Phone number"
            />

            <TextInput
              style={styles.login__formTextInput}
              onChangeText={(val) => setEmail(val)}
              value={email}
              placeholder="Email"
            />
            <TextInput
              style={styles.login__formTextInput}
              onChangeText={(val) => setPassword(val)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
            />

            <Button
              title="Proceed"
              buttonStyle={styles.login__button}
              titleStyle={styles.login__buttonLabel}
              disabled={hasEmpty()}
              loading={loading}
              onPress={() => handleRegister()}
            />
          </View>
          <View style={{ flex: 0.2, justifyContent: "center" }}>
            <View style={styles.login__signup}>
              <Text>ALREADY HAVE AN ACCOUNT? </Text>
              <TouchableOpacity
                style={styles.login__signupButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.login__signupButtonText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
