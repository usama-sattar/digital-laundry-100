import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import { API } from "../../global/constants";
import { cartContext } from "../../context/cart";
import { ListItem } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../global/colors";
import { chatContext } from "../../context/chat";
import { Avatar, Overlay, AirbnbRating } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const { order } = useContext(cartContext);

  useEffect(() => {
    getData();
  }, [order]);

  const getData = async () => {
    const customer = await AsyncStorage.getItem("customerId");
    if (customer) {
      const c = JSON.parse(customer);
      getOrders(c);
    }
  };
  const getOrders = async (customerId) => {
    const result = await axios.get(`${API}/customers/orders/${customerId}`);
    const data = await result.data;
    setOrders(data);
  };
  return (
    <View style={styles.container}>
      {orders.length > 0 ? (
        <ScrollView>
          {orders &&
            orders.map((item, key) => {
              return <OrderContainer item={item} key={key} />;
            })}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            visible={true}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../../no_orders.json")}
            animationStyle={{ width: 200, height: 200 }}
            speed={1}
            autoPlay
            loop
          ></LottieView>
        </View>
      )}
    </View>
  );
}
function OrderContainer({ item, key }) {
  const { user } = useContext(chatContext);
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [prevRating, setPrevRating] = useState(0);

  useEffect(() => {
    getRating();
  });
  const getRating = async () => {
    const result = await axios.get(`${API}/shop/order/rating/${item._id}`);
    const data = result.data;
    if (data.length > 0) {
      setPrevRating(data[0].rating);
      console.log(prevRating);
    }
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const sendRating = async (vendorId, orderId) => {
    if (rating > 0) {
      const result = await axios.post(
        `${API}/shop/rating/${vendorId}/${orderId}`,
        {
          rating,
        }
      );
      const data = await result.data;
      setVisible(!visible);
      if (data) {
        Alert.alert("Success", "Rating done successfully");
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    }
  };
  return (
    <ScrollView style={styles.container}>
      <ListItem
        key={key}
        bottomDivider
        containerStyle={{ backgroundColor: colors.tertiaryColor }}
      >
        <ListItem.Content>
          <ListItem.Subtitle style={{ color: colors.textColor, fontSize: 15 }}>
            Shop: {item.vendor}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={{ color: colors.textColor, fontSize: 15 }}>
            Price: {item.total}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content>
          <ListItem.Subtitle style={{ color: colors.textColor, fontSize: 15 }}>
            Status: {item.status}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content>
          {prevRating === 0 ? (
            <ListItem.Subtitle
              style={{ color: colors.lightBlue, fontSize: 15 }}
              onPress={toggleOverlay}
            >
              Give Rating
            </ListItem.Subtitle>
          ) : (
            <ListItem.Subtitle style={{ color: "blue", fontSize: 15 }}>
              {prevRating}
              <Ionicons name="star" size={15} color="#FFC000" />
            </ListItem.Subtitle>
          )}

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
            <Text>Rate Vendor</Text>
            <AirbnbRating
              size={20}
              onFinishRating={(rate) => setRating(rate)}
            />
            <Button
              title="Submit"
              onPress={() => sendRating(item.vendorId, item._id)}
              buttonStyle={{
                backgroundColor: colors.primaryColor,
                width: 100,
                alignSelf: "center",
                marginVertical: 10,
              }}
            />
          </Overlay>
        </ListItem.Content>
      </ListItem>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
  },
});
