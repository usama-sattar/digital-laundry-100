import React, { Fragment, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { colors } from "../../global/colors";
import { botData } from "../../global/constants";

let chats = [];
export default function ChatBot() {
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState("");

  const getAnswer = (q) => {
    for (let i = 0; i < botData.length; i++) {
      if (botData[i].question.includes(q.toLowerCase())) {
        chats = [...chats, { msg: botData[i].answer, incomingMsg: true }];
        setChatList([...chats].reverse());
        return;
      }
    }
    chats = [
      ...chats,
      { msg: "visit us to resolve queries", incomingMsg: true },
    ];
    setChatList([...chats].reverse());
    return;
  };
  const sendMsg = () => {
    chats = [...chats, { msg: message, sentMsg: true }];
    setChatList([...chats].reverse());
    setTimeout(() => {
      getAnswer(message);
    }, 1000);
    setMessage("");
  };
  return (
    <View>
      <FlatList
        style={{ height: "90%", bottom: "3%" }}
        data={chatList}
        inverted={true}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Msg incoming={item.incomingMsg} msg={item.msg} sent={item.sentMsg} />
        )}
      />
      <View
        style={{
          marginHorizontal: 20,
          alignSelf: "center",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <TextInput
          placeholder="Type here.."
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={{
            width: "80%",
            borderWidth: 0.5,
            padding: 8,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: colors.primaryColor,
            width: " 20%",
            justifyContent: "center",
            alignItems: "center",
          }}
          disabled={message ? false : true}
          onPress={() => sendMsg()}
        >
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Msg({ incoming, sent, msg }) {
  return (
    <Fragment>
      {incoming && (
        <View style={styles.incomingContainer}>
          <Text style={styles.incomingText}>{msg}</Text>
        </View>
      )}
      {sent && (
        <View style={styles.sentContainer}>
          <Text style={styles.sentText}>{msg}</Text>
        </View>
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  incomingContainer: {
    backgroundColor: colors.primaryColor,
    maxWidth: "70%",
    alignSelf: "flex-start",
    marginHorizontal: 15,
    marginVertical: 5,
    borderTopRightRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "white",
  },
  sentContainer: {
    backgroundColor: "white",
    maxWidth: "70%",
    alignSelf: "flex-end",
    marginHorizontal: 15,
    marginVertical: 5,
    borderTopLeftRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.lightBlue,
  },
  incomingText: {
    color: "white",
  },
});
