import { useState } from "react";
import { Image } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Colors from "../../../shared/theme/Colors";

import { useAuthContext } from "../../../context/AuthContext";

import { db, storage } from "../../../configs/firebase/firebase";

export default function UploadCredentials() {
  const { user } = useAuthContext();

  const [images, setImages] = useState([]);

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

      const storageRef = ref(storage, `credentials/${user.id}/${image.name}`);

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
  };

  return (
    <View style={styles.uploadCredentials}>
      <Text style={styles.uploadCredentials__title}>To finish the setup</Text>
      <Text style={styles.uploadCredentials__desc}>
        upload a copy of your credential
      </Text>

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
          <Button
            title="Upload"
            buttonStyle={styles.uploadCredentials__buttonSubmit}
            titleStyle={styles.uploadCredentials__buttonSubmitLabel}
            //   loading={loading}
            onPress={handleSubmit}
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
    </View>
  );
}

const styles = StyleSheet.create({
  uploadCredentials: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
});
