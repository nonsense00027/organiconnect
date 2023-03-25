import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import LoadingScreen from "../../../components/LoadingScreen";
import { db } from "../../../configs/firebase/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import { defaultAvatar } from "../../../shared/constants";
import Colors from "../../../shared/theme/Colors";
import {
  collectIdsAndDocs,
  formatConversationId,
} from "../../../shared/utilities";
import ProductList from "../../Seller/Products/components/ProductList";

export default function Shop() {
  const { user } = useAuthContext();

  const navigation = useNavigation();
  const route = useRoute();
  const { shopId } = route.params;

  const [loading, setLoading] = useState(true);
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productRef = collection(db, "products");

    const q = query(productRef, where("storeId", "==", shopId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setProducts(querySnapshot.docs.map(collectIdsAndDocs));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(
    () =>
      onSnapshot(doc(db, "users", shopId), (doc) => {
        setShop({ id: doc.id, ...doc.data() });
        setLoading(false);
      }),
    []
  );

  const handleMessage = () => {
    navigation.navigate("Conversation", {
      conversationId: formatConversationId(user.id, shopId),
      storeName: shop.storeName,
      shopId: shopId,
    });
  };

  if (loading) return <LoadingScreen />;

  return (
    <ScrollView style={styles.shop}>
      <View style={styles.shop__header}>
        <Image
          style={styles.shop__headerImage}
          resizeMode="cover"
          source={{
            uri: shop.profileImage ? shop.profileImage : defaultAvatar,
          }}
        />
        <View style={styles.shop__header__details}>
          <Text style={styles.shop__header__detailsName}>{shop.storeName}</Text>
          <Text>📞 {shop.phoneNumber}</Text>
          <Text>📩 {shop.email}</Text>
        </View>
        <View style={styles.shop__header__options}>
          <View style={{ flex: 1, marginHorizontal: 5 }}>
            <Button
              buttonStyle={styles.shop__header__optionsFollowButton}
              titleStyle={styles.shop__header__optionsMessageButtonLabel}
              //   disabled={hasEmpty()}
              //   loading={loading}
              //   onPress={() => handleRegister()}
            >
              <Icon type="antdesign" name="like2" size={16} />
              Follow
            </Button>
          </View>
          <View style={{ flex: 1, marginHorizontal: 5 }}>
            <Button
              buttonStyle={styles.shop__header__optionsMessageButton}
              titleStyle={styles.shop__header__optionsMessageButtonLabel}
              //   disabled={hasEmpty()}
              //   loading={loading}
              onPress={handleMessage}
            >
              <Icon type="antdesign" name="message1" size={16} />
              Send a message
            </Button>
          </View>
        </View>
      </View>
      <View style={styles.shop__productsList}>
        <ProductList data={products} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shop: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  shop__header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.gray,
  },
  shop__headerImage: {
    height: 180,
    width: 180,
    borderRadius: 180 / 2,
  },
  shop__header__details: {
    alignItems: "center",
  },
  shop__header__detailsName: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    marginVertical: 10,
  },
  shop__header__options: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
  },
  shop__header__optionsFollowButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
  },
  shop__header__optionsMessageButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
  },
  shop__header__optionsMessageButtonLabel: {
    color: "black",
    fontSize: 14,
    marginLeft: 10,
  },
  shop__productsList: {
    padding: 10,
  },
});
