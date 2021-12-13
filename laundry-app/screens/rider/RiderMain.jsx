import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import "./socket";
import { Button, colors } from "react-native-elements";
import io from "socket.io-client/dist/socket.io";
import { API } from "../../global/constants";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LottieView from "lottie-react-native";
import { color } from "react-native-elements/dist/helpers";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
AsyncStorage.setItem("riderId", JSON.stringify("617efb920b89a12e0f074587"));

function RiderMain({ navigation }) {
  const [rider, setRider] = useState("");
  const [fullSocket, setFullSocket] = useState(null);
  const [region, setRegion] = useState();
  const [rideData, setRideData] = useState(null);
  const [socket, setSocket] = useState(null);
  const LatitudeDelta = 0.0922;
  const AspectRatio = width / height;
  const LongitudeDelta = AspectRatio * LatitudeDelta;

  useEffect(() => {
    getLocation();
    getData();
    getSocket();
  }, []);

  const getSocket = async () => {
    const s = await io(`${API}`, { jsonp: false });
    s.on("connect", async () => {
      await setSocket(s.id);
      await setFullSocket(s);
    });
    return () => {
      s.disconnect();
    };
  };
  const getLocation = async () => {
    await Location.installWebGeolocationPolyfill();
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          latitudeDelta: 0.0922,
          longitudeDelta: LongitudeDelta,
        });
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };
  const Logout = () => {
    AsyncStorage.clear();
    navigation.navigate("Login");
  };
  const getData = async () => {
    const rider = await AsyncStorage.getItem("riderId");
    if (rider) {
      const riderId = await JSON.parse(rider);
      setRider(riderId);
    }
  };
  const setLocation = async () => {
    if (socket === null || rider === null || region === null) {
      console.log("in");
      return;
    }
    const response = await axios.post(`${API}/booking/update/location`, {
      riderId: rider,
      socketId: socket,
      coordinate: {
        type: "Point",
        coordinates: [region.longitude, region.latitude],
      },
    });
    const result = await response.data;
    console.log(result);
    navigation.navigate("RideDetailScreen", {
      fullSocket: fullSocket,
      socket: socket,
      rider: rider,
    });
  };
  return (
    <View style={styles.container}>
      {region && (
        <MapView
          loadingEnabled={true}
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
        >
          <MapView.Marker secondaryColor="red" coordinate={region} />
        </MapView>
      )}
      <TouchableOpacity
        style={{
          height: "30%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={setLocation}
      >
        <LottieView
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../../go_rider.json")}
          animationStyle={{ width: 200, height: 200 }}
          speed={1}
          autoPlay
          loop
        ></LottieView>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 80,
          height: 50,
          backgroundColor: "white",
          position: "absolute",
          top: 5,
          right: 5,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
        onPress={Logout}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
  },
  map: {
    height: "70%",
  },
});
export default RiderMain;
