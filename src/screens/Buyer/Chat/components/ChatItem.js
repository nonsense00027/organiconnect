import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import { doc, onSnapshot } from "firebase/firestore";

import { useAuthContext } from "../../../../context/AuthContext";

import { db } from "../../../../configs/firebase/firebase";

import { defaultAvatar } from "../../../../shared/constants";
import { formatConversationId } from "../../../../shared/utilities";

const ChatItem = ({ item }) => {
  const { user } = useAuthContext();

  const navigation = useNavigation();

  const [info, setInfo] = useState(null);

  useEffect(() => {
    const userRef = doc(db, "users", item.id.replace(user.id, ""));
    const unsub = onSnapshot(userRef, (doc) => {
      setInfo({ id: doc.id, ...doc.data() });
    });

    return () => {
      unsub();
    };
  }, []);

  const getName = () => (info.storeName ? info.storeName : info.firstname);

  function isLastMessageUserMe() {
    const lastMessageUser = item.lastMessage.user;
    if (!lastMessageUser) return null;
    if (lastMessageUser === user.id) return "You: ";
    return null;
  }

  if (!info) return <View></View>;

  return (
    <TouchableOpacity
      className="flex-row py-2 px-2 rounded-md items-center"
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate("Conversation", {
          conversationId: formatConversationId(user.id, info.id),
          storeName: info.storeName,
          shopId: info.id,
        });
      }}
    >
      <Avatar
        rounded
        size={45}
        source={{ uri: info.profileImage ? info.profileImage : defaultAvatar }}
        title={getName()}
      />
      <View className="flex-1 px-2">
        <View className="flex-row pb-1">
          <Text className="flex-1 font-bold">{getName()}</Text>
          {item.lastMessage ? (
            <Text className="opacity-70 text-xs">
              {/* {moment(item?.timestamp.toDate()).format("h:mm a")} */}
            </Text>
          ) : null}
        </View>

        {item.lastMessage ? (
          <Text className="text-xs">
            {isLastMessageUserMe()}
            {item.lastMessage.message.slice(0, 35)}
            {item.lastMessage.message.length > 35 && "..."}
          </Text>
        ) : (
          <Text className="text-sm italic opacity-40">
            Start a conversation
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
