import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../../configs/firebase/firebase";
import { collectIdsAndDocs } from "../../../../../shared/utilities";
import ShopsList from "./ShopsList";
import { SearchBar } from "@rneui/themed";

export default function Shops() {
  const [shops, setShops] = useState([]);
  const [search, setSearch] = useState("");

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

  const updateSearch = (search) => {
    setSearch(search);
  };

  const getShops = () => {
    if (search.length < 1) {
      return shops;
    } else {
      return shops.filter((item) =>
        item.storeName.toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  return (
    <View>
      <SearchBar
        placeholder="Search shop..."
        onChangeText={updateSearch}
        value={search}
        platform={Platform.OS}
      />
      <View style={styles.shops__heading}>
        <Text style={styles.shops__title}>Available Stores</Text>
        <TouchableOpacity>
          <Text className="text-blue-500">See all</Text>
        </TouchableOpacity>
      </View>
      <ShopsList items={getShops()} />
    </View>
  );
}

const styles = StyleSheet.create({
  shops: {},
  shops__heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  shops__title: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
  },
});
