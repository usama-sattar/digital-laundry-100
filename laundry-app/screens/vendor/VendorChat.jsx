import React, { useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { chatContext } from "../../context/chat";
import { ListItem, Avatar } from "react-native-elements";
import { API } from "../../global/constants";
import axios from "axios";
import LottieView from "lottie-react-native";

export default function VendorChat({ route, navigation }) {
  const { vendor } = useContext(chatContext);
  const [loading, setLoading] = useState(true);

  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${API}/conversation/${vendor}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [vendor]);

  return (
    <View style={styles.container}>
      {loading === true ? (
        <LottieView
          visible={loading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../../loader.json")}
          animationStyle={styles.lottie}
          speed={1}
          autoPlay
          loop
        ></LottieView>
      ) : (
        <View>
          {conversations.length > 0 ? (
            conversations.map((c, i) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("VendorChatMessageScreen", {
                    currentChat: c,
                  })
                }
              >
                <ConversationContainer
                  conversation={c}
                  currentUser={vendor}
                  index={i}
                />
              </Pressable>
            ))
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No contacts</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

function ConversationContainer({
  conversation,
  currentUser,
  index,
  navigation,
}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
    const getUser = async () => {
      try {
        const res = await axios.get(`${API}/customers/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return user === null ? (
    <Text>Nothing</Text>
  ) : (
    user.map((u) => {
      return (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{u.name}</ListItem.Title>
            <ListItem.Subtitle>{u.phone}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    })
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
