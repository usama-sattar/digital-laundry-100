import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import axios from "axios";
import { API } from "../../global/constants";
import { colors } from "../../global/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

function RideDetails({ route }) {
  const { fullSocket, socket, rider } = route.params;
  const [rideData, setRideData] = useState(null);

  const updateBooking = async () => {
    const res = await axios.post(`${API}/booking/update/booking`, {
      _id: rideData._id,
      riderId: rider,
      coordinate: rideData.coordinate,
      status: "assigned",
    });
    const result = await res.data;
  };
  const rejectRide = async () => {
    fullSocket.emit("reject-ride", "ss");
  };
  useEffect(() => {
    if (fullSocket === null) {
      return;
    }
    const riderRequest = socket + "riderRequest";
    fullSocket.on(riderRequest, (rideData) => {
      setRideData(rideData);
    });
  }, [fullSocket]);

  return (
    <View style={styles.container}>
      <View>
        {rideData === null ? null : (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
            }}
          >
            <View style={styles.card}>
              <Text style={styles.heading}>Source</Text>
              <Text style={styles.subHeading}>
                {rideData.pickUpData.address}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.heading}>Destination</Text>
              <Text style={styles.subHeading}>
                {rideData.dropOffData.address}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.heading}>Estimaed Fare</Text>
              <Text style={[styles.subHeading, { fontSize: 25 }]}>
                Rs. {rideData.fare}
              </Text>
            </View>
            <View
              style={[
                styles.card,
                { flexDirection: "row", justifyContent: "space-around" },
              ]}
            >
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: "green",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
                onPress={updateBooking}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
                onPress={rejectRide}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
    justifyContent: "center",
  },
  card: {
    height: "20%",
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
  heading: {
    fontSize: 30,
  },
  subHeading: {
    marginTop: 10,
    padding: 5,
    fontSize: 15,
    textAlign: "center",
  },
});
export default RideDetails;
