import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { sortByDistance } from "sort-by-distance";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../../configs/firebase/firebase";

import Colors from "../../../shared/theme/Colors";
import { collectIdsAndDocs } from "../../../shared/utilities";

import NearShopsList from "./components/NearShopsList";

export default function NearMe() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [shops, setShops] = useState([]);

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
    return distanceInKm;
  }

  const getNearbyShops = () => {
    if (!location) return;
    const shops = sortByDistance(origin, points, opts);
    const result = shops.map((item) => ({
      ...item,
      distance: radiansToKilometers(item.distance),
    }));
    return result;
  };

  if (loading) {
    return (
      <View>
        <Text>Getting location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.nearMe}>
      <NearShopsList items={getNearbyShops()} />
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
