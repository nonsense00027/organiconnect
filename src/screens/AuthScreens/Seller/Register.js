import React, { useEffect, useState } from "react";
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
import { auth, db, storage } from "../../../configs/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "../../../context/AuthContext";
import { Icon } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../../shared/theme/Colors";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as Location from "expo-location";

export default function Register({ navigation }) {
  // const { location } = useAuthContext();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [storeName, setStoreName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [images, setImages] = useState([]);

  const getImageName = (image) => image.split("/").slice(-1);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const response = await fetch(images[0].uri);
      const blob = await response.blob();

      const storageRef = ref(
        storage,
        `profilePictures/${user.id}/${getImageName(images[0].uri)}`
      );

      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await setDoc(doc(db, "users", user.uid), {
              email,
              firstname,
              lastname,
              storeName,
              phoneNumber,
              role: "seller",
              profilePicture: downloadURL,
              timestamp: serverTimestamp(),
              location: location?.coords || {},
            });
          });
        }
      );

      // await setDoc(doc(db, "shops", user.uid), {
      //   owner: {
      //     id: user.uid,
      //     firstname,
      //     lastname,
      //   },
      //   storeName,
      //   email,
      //   phoneNumber,
      //   timestamp: serverTimestamp(),
      // });
    } catch (error) {
      console.log(error);
      ToastAndroid.showWithGravityAndOffset(
        `${error.message.split("]")[1]}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        50
      );
      setLoading(false);
    }
  };

  const hasEmpty = () => {
    return hasBlank([firstname, lastname, storeName, email, password]);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //   allowsEditing: false,
      //   allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  if (!location) {
    return (
      <View>
        <Text>Getting your Location...</Text>
      </View>
    );
  }

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
              <Text style={styles.login__title}>Create your store</Text>
            </View>
            <View style={styles.login__error}>
              {error && <Text style={styles.login__errorText}>{error}</Text>}
            </View>

            <TouchableOpacity
              className="flex flex-row items-center rounded-md bg-gray-100 px-3 py-4 mb-3"
              onPress={pickImage}
            >
              <Icon
                type="material-community"
                name="image-plus"
                color={Colors.primary}
              />
              <Text className="flex-1 ml-2">
                {images.length > 0
                  ? getImageName(images[0]?.uri)
                  : "Add Store Profile Picture"}
              </Text>
            </TouchableOpacity>

            <TextInput
              style={styles.login__formTextInput}
              onChangeText={(val) => setStoreName(val)}
              value={storeName}
              autoFocus
              placeholder="Store name"
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

            <Text style={{ marginVertical: 5, fontFamily: "Roboto-Regular" }}>
              Owner Info
            </Text>

            <TextInput
              style={styles.login__formTextInput}
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
