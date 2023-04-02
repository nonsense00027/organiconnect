import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { sortByDistance } from "sort-by-distance";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import DropDownPicker from "react-native-dropdown-picker";

import { db } from "../../../configs/firebase/firebase";

import Colors from "../../../shared/theme/Colors";
import { collectIdsAndDocs } from "../../../shared/utilities";

import NearShopsList from "./components/NearShopsList";

export default function NearMe() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [shops, setShops] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(5);
  const [items, setItems] = useState([
    { label: "within 5km away", value: 5 },
    { label: "within 10km away", value: 10 },
    { label: "within 20km away", value: 20 },
  ]);

  async function getLocation() {
    const result = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    if (result) {
      setLocation(result);
      setLoading(false);
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("role", "==", "seller"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setShops(querySnapshot.docs.map(collectIdsAndDocs));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const points = shops.map((shop) => ({ ...shop, ...shop.location }));

  const opts = {
    yName: "latitude",
    xName: "longitude",
  };

  const origin = {
    longitude: location?.coords.longitude,
    latitude: location?.coords.latitude,
  };

  function radiansToKilometers(distanceInRadians) {
    const earthRadiusInKm = 6371; // Earth's mean radius in kilometers
    const distanceInKm = distanceInRadians * earthRadiusInKm;
    return convertDistance(distanceInKm);
  }

  function convertDistance(distance) {
    if (distance >= 1) {
      return { value: distance.toFixed(2), label: "km", default: distance };
    } else {
      const meters = distance * 1000;
      return { value: meters.toFixed(2), label: "m", default: distance };
    }
  }

  const getNearbyShops = () => {
    if (!location) return;
    const shops = sortByDistance(origin, points, opts);
    const result = shops.map((item) => ({
      ...item,
      distance: radiansToKilometers(item.distance),
    }));

    const final = result.filter((item) => item.distance.default < value);
    return final;
  };

  console.log(value);

  if (loading) {
    return (
      <View>
        <Text>Getting location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.nearMe}>
      <Text className="text-md font-semibold mb-1">Select distance:</Text>
      <View className="mb-2">
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <NearShopsList items={getNearbyShops()} distance={value} />
    </View>
  );
}

const styles = StyleSheet.create({
  nearMe: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
});
