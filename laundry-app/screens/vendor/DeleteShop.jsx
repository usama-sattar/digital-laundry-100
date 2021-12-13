import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API } from "../../global/constants";
import { colors } from "../../global/colors";
import LottieView from "lottie-react-native";

export default function DeleteShop() {
  const [shop, setShop] = useState(null);
  const [name, setName] = useState("");
  useEffect(() => {
    getStorage();
  }, []);

  const getStorage = async () => {
    const vendor = await AsyncStorage.getItem("vendorId");
    if (vendor) {
      const vendorId = await JSON.parse(vendor);
      await getData(vendorId);
    }
  };
  const getData = async (vendorId) => {
    const result = await axios.get(`${API}/shop/${vendorId}`);
    const data = await result.data;
    setShop(data);
  };

  const deleteShop = async () => {
    const shop_id = await shop._id;
    const result = await axios.get(`${API}/shop/delete/${shop_id}`);
    console.log(result.data);
  };
  return (
    <View style={{ flex: 1 }}>
      {shop === null ? (
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View style={{ marginTop: "30%" }}>
            <Text style={{ fontSize: 20 }}>Nothing found</Text>
          </View>
          <LottieView
            visible={true}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../../nothing-found.json")}
            animationStyle={{ width: 300, height: 300 }}
            speed={1}
            autoPlay
            loop
          ></LottieView>
        </View>
      ) : (
        <View>
          <Input
            placeholder="SHOP NAME"
            errorStyle={{ color: "red" }}
            errorMessage="ENTER SHOP NAME TO DELETE"
            onChangeText={(text) => setName(text)}
          />
          {name === shop.name ? (
            <Button
              title="Delete"
              onPress={deleteShop}
              containerStyle={{ width: 100, alignSelf: "center" }}
              buttonStyle={{ backgroundColor: "rgb(223, 71, 89)" }}
            />
          ) : null}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
