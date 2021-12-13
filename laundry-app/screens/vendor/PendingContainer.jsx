import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { TextInput, StyleSheet, Alert } from "react-native";
import { ProductConsumer } from "../../context";
import { colors } from "../../global/colors";
import { Button } from "react-native-elements";
import axios from "axios";
import { API } from "../../global/constants";
import { ListItem, Overlay } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PendingScreenContainer({ route, navigation }) {
  const [user, setUser] = useState("");

  const { data } = route.params;
  console.log(data);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const vendor = await AsyncStorage.getItem("vendorId");
    if (vendor) {
      const vendorId = await JSON.parse(vendor);
      setUser(vendorId);
    }
  };
  const changeStatus = async () => {
    const result = await axios.post(`${API}/vendors/pending/${user}`, {
      status: "completed",
    });
    const data = await result.data;
    Alert.alert("Success", "Status changed succesfully");
    setTimeout(() => {
      navigation.navigate("VendorScreen");
    });
  };
  return (
    <View
      style={{
        backgroundColor: colors.secondaryColor,
        flex: 1,
      }}
    >
      <View style={{ flex: 0.9 }}>
        <View
          style={{
            width: "80%",
            height: 150,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 35 }}>New Order</Text>
          <Text style={{ fontSize: 25 }}> Rs {data.total} </Text>
        </View>
        <View style={{ width: "80%", alignSelf: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                width: "40%",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Name
            </Text>
            <Text style={{ fontSize: 15, width: "60%", textAlign: "right" }}>
              {data.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                width: "40%",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Contact
            </Text>
            <Text style={{ fontSize: 15, width: "60%", textAlign: "right" }}>
              {data.contact}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                width: "40%",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Address
            </Text>
            <Text style={{ fontSize: 15, width: "60%", textAlign: "right" }}>
              {data.address}
            </Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            width: "80%",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 35, color: colors.textColor }}>Cart</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                width: "40%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              TItle
            </Text>
            <Text
              style={{
                fontSize: 15,
                width: "40%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Qunatity
            </Text>
            <Text
              style={{
                fontSize: 15,
                width: "40%",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Price
            </Text>
          </View>
          <View>
            {data.cart.map((p, i) => {
              return (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 15, width: "40%", textAlign: "center" }}
                  >
                    {p.name}
                  </Text>
                  <Text
                    style={{ fontSize: 15, width: "40%", textAlign: "center" }}
                  >
                    {p.quantity}
                  </Text>
                  <Text
                    style={{ fontSize: 15, width: "40%", textAlign: "center" }}
                  >
                    {p.price}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={changeStatus}
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgray",
            height: 50,
            alignSelf: "center",
            padding: 5,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "black" }}>Mark as completed ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            width: 100,
            height: 100,
            alignSelf: "flex-end",
            marginHorizontal: 20,
            marginTop: 20,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("RideBookingScreen")}
        >
          <Text style={{ color: "white" }}>Book Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textView: {
    color: colors.textColor,
    fontSize: 18,
    alignSelf: "center",
    marginTop: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
