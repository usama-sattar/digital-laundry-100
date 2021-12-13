import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { API } from "../../global/constants";
import axios from "axios";
import LottieView from "lottie-react-native";
import {
  BottomSheet,
  ListItem,
} from "react-native-elements/dist/bottomSheet/BottomSheet";

export default function FindRider({ navigation, route }) {
  const [details, setDetails] = useState(null);
  const [noRider, setNoRider] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [riderData, setRiderData] = useState(null);
  const { socket } = route.params;
  useEffect(() => {
    if (socket === null) {
      return;
    }
    socket.current.on("accept-ride", (data) => {
      setDetails(data);
    });
    socket.current.on("send-reject", (data) => setNoRider(data));
  }, [socket]);

  useEffect(() => {
    getRiderDetails();
  }, [details]);

  const getRiderDetails = async () => {
    if (details === null) {
      return;
    }
    const id = await details.riderId;
    const res = await axios.get(`${API}/riders/${id}`);
    const result = await res.data;
    setRiderData(result);
  };
  return (
    <View style={styles.container}>
      {details === null ? (
        <View style={{ flex: 1, alignItems: "center" }}>
          <LottieView
            visible={true}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../../finding-rider.json")}
            animationStyle={{ width: 200, height: 200 }}
            speed={1}
            autoPlay
            loop
          ></LottieView>
        </View>
      ) : (
        <View>
          <View
            style={{
              height: "100%",
              justifyContent: "center",
            }}
          >
            <View style={styles.card}>
              <Text style={styles.heading}>Rider Detail</Text>
              <Text style={styles.subHeading}>
                {riderData && riderData.name}
              </Text>
              <Text style={styles.subHeading}>
                {riderData && riderData.phone}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.heading}>Source</Text>
              <Text style={styles.subHeading}>
                {details.pickUpData.address}
              </Text>
              <Text style={styles.heading}>Destination</Text>
              <Text style={styles.subHeading}>
                {details.dropOffData.address}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.heading}>Estimaed Fare</Text>
              <Text style={[styles.subHeading, { fontSize: 25 }]}>
                Rs. {details.fare}
              </Text>
            </View>
          </View>
        </View>
      )}
      {noRider === null ? null : (
        <View>
          <Text style={{ textAlign: "center", fontSize: 30 }}>
            No Rider Found
          </Text>
          <View
            style={{
              height: "100%",
              justifyContent: "center",
            }}
          >
            <LottieView
              visible={true}
              overlayColor="rgba(255,255,255,0.75)"
              source={require("../../rider.json")}
              animationStyle={{ width: 200, height: 200 }}
              speed={1}
              autoPlay
              loop
            ></LottieView>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 30,
  },
  subHeading: {
    marginTop: 10,
    padding: 5,
    fontSize: 15,
    textAlign: "center",
  },
  card: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 3,
  },
});
