import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Button,
  Overlay,
  AirbnbRating,
  Image,
} from "react-native-elements";
import { colors } from "../../global/colors";
import axios from "axios";
import { API } from "../../global/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { chatContext } from "../../context/chat";
import { Ionicons } from "@expo/vector-icons";

export default function AboutScreen({ navigation }) {
  const { user } = useContext(chatContext);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(0);

  const Logout = () => {
    AsyncStorage.clear();
    navigation.navigate("Login");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  useEffect(() => {
    getUserData();
  }, []);
  const sendRating = async () => {
    if (rating > 0) {
      const result = await axios.post(`${API}/customers/rating/${user}`, {
        rating,
      });
      Alert.alert("Rating Done");
    }
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const getUserData = async () => {
    const res = await axios.get(`${API}/customers/current/${user}`);
    const result = await res.data;
    setName(result.name);
    setPhone(result.phone);
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.secondaryColor }}>
      <View style={{ flex: 0.8 }}>
        <View
          style={{ alignSelf: "center", flex: 1, justifyContent: "center" }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={require("../../assets/profile.png")}
              style={{ width: 120, height: 120 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 20 }}>{name.toUpperCase()}</Text>
            <Text style={{ fontSize: 15, color: "gray" }}>{phone}</Text>
          </View>
          <View style={{ marginTop: 20, width: 300 }}>
            <TouchableOpacity
              onPress={toggleOverlay}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                backgroundColor: colors.tertiaryColor,
                padding: 20,
              }}
            >
              <Ionicons
                name="star-outline"
                size={20}
                style={{ width: "20%" }}
              />
              <Text style={{ width: "60%" }}>Rate Us</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                style={{ width: "20%" }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                backgroundColor: colors.tertiaryColor,
                padding: 20,
                marginTop: 5,
              }}
              onPress={() => {
                Logout();
              }}
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                style={{ width: "20%" }}
              />
              <Text style={{ width: "60%" }}>Logout</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                style={{ width: "20%" }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{
            width: 250,
            height: 250,
            borderRadius: 20,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text>Rate Our App</Text>
          <AirbnbRating size={20} onFinishRating={(rate) => setRating(rate)} />
          <Button
            title="Submit"
            onPress={sendRating}
            buttonStyle={{
              backgroundColor: colors.primaryColor,
              width: 100,
              alignSelf: "center",
              marginVertical: 10,
            }}
          />
        </Overlay>
      </View>
      <View style={{ flex: 0.2 }}>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginHorizontal: 20,
          }}
        >
          <Avatar
            rounded
            size="large"
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1698/1698535.png",
            }}
            onPress={() => navigation.navigate("ChatBotScreen")}
          />
        </View>
      </View>
    </View>
  );
}
