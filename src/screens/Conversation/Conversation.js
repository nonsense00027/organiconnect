import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import moment from "moment";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Icon, Button } from "@rneui/themed";

import { db } from "../../configs/firebase/firebase";

import Colors from "../../shared/theme/Colors";
import { defaultAvatar } from "../../shared/constants";
import { collectIdsAndDocs } from "../../shared/utilities";

import { useAuthContext } from "../../context/AuthContext";

import ConversationsList from "./components/ConversationsList";

const Conversation = () => {
  const { user } = useAuthContext();

  const route = useRoute();
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const { conversationId, storeName, shopId } = route.params;

  useEffect(() => {
    const messagesRef = collection(db, "chats", conversationId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(querySnapshot.docs.map(collectIdsAndDocs));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      const messagesRef = collection(db, "chats", conversationId, "messages");

      await addDoc(messagesRef, {
        message,
        timestamp: serverTimestamp(),
        user: user.id,
      });

      const conversationRef = doc(db, "chats", conversationId);

      await setDoc(
        conversationRef,
        {
          lastMessage: {
            message,
            user: user.id,
          },
          timestamp: serverTimestamp(),
          participants: [user.id, shopId],
        },
        { merge: true }
      );

      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.conversation}>
      <View className="flex-row p-3 items-center border-b border-b-gray-300">
        <TouchableOpacity className="pr-4" onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" type="ant-design" size={24} />
        </TouchableOpacity>

        <Image
          className="h-12 w-12 rounded-full mr-1"
          resizeMode="cover"
          source={{ uri: defaultAvatar }}
        />
        <View className={`pl-2`}>
          <Text className="text-black font-semibold">{storeName}</Text>
          {messages.length > 0 && messages[0].timestamp && (
            <Text className="opacity-70">
              {moment(new Date(messages[0].timestamp?.toDate())).fromNow()}
            </Text>
          )}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className={`flex-1`}
        keyboardVerticalOffset={50}
      >
        <ConversationsList data={messages} />

        <View className="flex-row items-center py-3 px-5 border-t border-t-gray-300">
          <TextInput
            autoFocus
            className="flex-1 rounded-md px-2 border-b border-b-gray-300"
            selectionColor={"red"}
            placeholder="Aa"
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <Button
            buttonStyle={{
              backgroundColor: Colors.primary,
            }}
            titleStyle={{
              color: "#0275d8",
            }}
            disabled={message.length < 1}
            icon={
              <Icon
                type="material"
                name="send"
                color={message.length < 1 ? "gray" : Colors.white}
              />
            }
            onPress={handleSendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Conversation;

const styles = StyleSheet.create({
  conversation: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
