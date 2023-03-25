import { useState } from "react";
import { Button, Icon } from "@rneui/themed";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Colors from "../../../shared/theme/Colors";

import { useAuthContext } from "../../../context/AuthContext";

import { db, storage } from "../../../configs/firebase/firebase";

export default function AddProduct() {
  const { user } = useAuthContext();

  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);

  const [loading, setLoading] = useState(false);

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

  const uploadImage = async (image, index) => {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(image.uri);
      const blob = await response.blob();

      const storageRef = ref(
        storage,
        `products/${user.id}/${productName}-${new Date().toDateString()}`
      );

      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.log("error: ", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    let imageUrls = [];
    await Promise.all(
      images.map(async (image, index) => {
        if (image) {
          await uploadImage(image, index)
            .then((url) => {
              imageUrls = [...imageUrls, url];
            })
            .catch((err) => console.log("error: ", err));
        }
      })
    );

    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      credentials: imageUrls,
    });

    const productRef = collection(db, "products");

    await addDoc(productRef, {
      storeId: user.id,
      productName,
      description,
      price,
      qty,
      imageUrls,
      timestamp: serverTimestamp(),
    });

    resetFields();
    ToastAndroid.showWithGravityAndOffset(
      "Product has been added.",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      50
    );
    setLoading(false);
  };

  function resetFields() {
    setProductName("");
    setDescription("");
    setPrice("");
    setQty("");
    setImages([]);
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.uploadCredentials}>
        {images.length > 0 ? (
          <View>
            <Image
              className="h-60 w-48 rounded-md border-gray-300 bg-gray-100 border"
              resizeMode="cover"
              source={{ uri: images[0].uri }}
            />
            <Button
              title="Select Photo"
              buttonStyle={styles.uploadCredentials__buttonSelect}
              titleStyle={styles.uploadCredentials__buttonSubmitLabel}
              //   loading={loading}
              onPress={pickImage}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={pickImage}
            className="items-center justify-center h-60 w-48 bg-gray-100 border-gray-300 rounded-md"
            activeOpacity={0.5}
          >
            <Icon type="material-community" name="image-plus" />

            <Text>Add photo</Text>
          </TouchableOpacity>
        )}
        <View style={styles.addProduct__form}>
          <TextInput
            style={styles.login__formTextInput}
            onChangeText={(val) => setProductName(val)}
            value={productName}
            placeholder="Name"
          />
          <TextInput
            style={styles.login__formTextInput}
            onChangeText={(val) => setDescription(val)}
            value={description}
            placeholder="Description"
          />
          <TextInput
            style={styles.login__formTextInput}
            onChangeText={(val) => setPrice(val)}
            value={price}
            keyboardType="numeric"
            placeholder="Price"
          />
          <TextInput
            style={styles.login__formTextInput}
            onChangeText={(val) => setQty(val)}
            value={qty}
            keyboardType="numeric"
            placeholder="Quantity"
          />
          <Button
            title="Add"
            buttonStyle={styles.uploadCredentials__buttonSubmit}
            titleStyle={styles.uploadCredentials__buttonSubmitLabel}
            loading={loading}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  uploadCredentials: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    paddingTop: 10,
  },

  uploadCredentials__title: {
    fontFamily: "Roboto-Bold",
    fontSize: 23,
    textAlign: "center",
    marginBottom: 5,
  },
  uploadCredentials__desc: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginBottom: 30,
  },
  uploadCredentials__buttonSubmit: {
    marginTop: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
  },
  uploadCredentials__buttonSelect: {
    marginTop: 10,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
  },
  uploadCredentials__buttonSubmitLabel: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 14,
  },
  login__formTextInput: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: Colors.input,
    borderRadius: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  addProduct__form: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
});
