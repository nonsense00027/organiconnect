import React, { useState, useEffect } from "react";
import styles from ".././styles";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button } from "@rneui/themed";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../configs/firebase/firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (err) => {
    switch (err.code) {
      case "auth/invalid-email":
        setError("Invalid email address.");
        break;
      case "auth/wrong-password":
        setError("Invalid password.");
        break;
      case "auth/user-not-found":
        setError("Account not found.");
        break;
      default:
        setError("Something went wrong, please try again.");
    }
  };

  const onLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        handleError(error);
        setAuthLoading(false);
      });
  };

  const noEmpty = () => {
    return email.length > 0 && password.length > 0;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "pan"}
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.login}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.login__header}>
              <Text style={styles.login__title}>Welcome Back!</Text>
            </View>
            <View style={styles.login__error}>
              {error && <Text style={styles.login__errorText}>{error}</Text>}
            </View>
            <TextInput
              style={styles.login__formTextInput}
              autoFocus
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
              title="Log In"
              buttonStyle={styles.login__button}
              titleStyle={styles.login__buttonLabel}
              disabled={!noEmpty()}
              loading={loading}
              onPress={() => onLogin()}
            />
            <TouchableOpacity style={styles.login__forgot}>
              <Text style={styles.login__forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.2, justifyContent: "center" }}>
            <View style={styles.login__signup}>
              <Text>DOES NOT HAVE AN ACCOUNT? </Text>
              <TouchableOpacity
                style={styles.login__signupButton}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.login__signupButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
