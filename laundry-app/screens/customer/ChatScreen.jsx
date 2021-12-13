import React, { useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";
import { chatContext } from "../../context/chat";
import { ListItem, Avatar } from "react-native-elements";
import { API } from "../../global/constants";
import axios from "axios";
import LottieView from "lottie-react-native";

export default function ChatScreen({ route, navigation }) {
  const { user } = useContext(chatContext);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    newConversation();
  }, [conversations]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const newConversation = async () => {
    if (route.params) {
      const { data } = route.params;
      const res = await axios.get(
        `${API}/conversation/find/${user}/${data.vendor}`
      );
      console.log(res.data);
      if (res.data === null) {
        const res = await axios.post(`${API}/conversation/`, {
          senderId: user,
          receiverId: data.vendor,
        });
        setConversations(res.data);
      }
    }
  };
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${API}/conversation/${user}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

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
        <ScrollView>
          {conversations.length > 0 ? (
            conversations.map((c, i) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("ChatMessageScreen", { currentChat: c })
                }
              >
                <ConversationContainer
                  conversation={c}
                  currentUser={user}
                  index={i}
                />
              </Pressable>
            ))
          ) : (
            <Text style={{ textAlign: "center" }}>No contacts</Text>
          )}
        </ScrollView>
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
        const res = await axios.get(`${API}/shop/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return user === null ? (
    <Text></Text>
  ) : (
    <ListItem key={index} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{user.name}</ListItem.Title>
        <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
