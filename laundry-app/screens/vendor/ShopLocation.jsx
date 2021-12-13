import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { colors } from "../../global/colors";
import axios from "axios";
import { API } from "../../global/constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

export default function ShopLocation({ navigation }) {
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [shop, setShop] = useState(null);

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
  const setValues = (data, details) => {
    setCoordinates({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    setLocation(data.description);
    navigation.navigate("ShopName", {
      coordinates: coordinates,
      location: location,
    });
  };
  return (
    <View style={{ flex: 1 }}>
      {shop !== null ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 20 }}>You already have a shop</Text>
        </View>
      ) : (
        <View>
          <View style={styles.search}>
            <GooglePlacesAutocomplete
              placeholder="Shop Location"
              minLength={3}
              autoFocus={false}
              fetchDetails={true}
              listViewDisplayed="auto"
              renderDescription={(row) => row.description}
              returnKeyType={"search"}
              onPress={(data, details = null) => {
                setValues(data, details);
              }}
              query={{
                key: "AIzaSyCSCRz0dn9b8tujCwtYNcgS--DSZ-cDBN0",
                language: "en",
              }}
              GooglePlacesDetailsQuery={{
                fields: ["formatted_address", "geometry"],
              }}
            />
          </View>
          <LottieView
            style={styles.lottie}
            visible={true}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../../location.json")}
            speed={1}
            autoPlay
            loop
          ></LottieView>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  lottie: {
    position: "absolute",
    top: "50%",
    width: 350,
    height: 350,
  },
  search: {
    position: "absolute",
    top: 20,
    left: 0,
    zIndex: 999,
    width: "90%",
    marginHorizontal: 20,
  },
});
