import { Icon } from "@rneui/themed";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../../../configs/firebase/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import Colors from "../../../shared/theme/Colors";
import { collectIdsAndDocs } from "../../../shared/utilities";
import ChatsList from "./components/ChatsList";
// import Chats from "../../components/Chat/Chats";

const Chat = () => {
  const { user } = useAuthContext();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("participants", "array-contains", user.id),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setChats(querySnapshot.docs.map(collectIdsAndDocs));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.chat}>
      {/* <View className="flex-row justify-between items-center px-4 py-4">
        <Text className="text-2xl font-semibold">Chats</Text>
        <TouchableOpacity>
          <Icon type="font-awesome" name="pencil-square-o" />
        </TouchableOpacity>
      </View> */}
      {chats.length > 0 ? (
        <View>
          <ChatsList data={chats} />
        </View>
      ) : (
        <View className="flex-1 justify-center items-center opacity-70`">
          <Icon
            type="material-community"
            name="chat-remove-outline"
            size={50}
          />
          <Text className="pt-2">No messages available</Text>
        </View>
      )}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
  },
});
