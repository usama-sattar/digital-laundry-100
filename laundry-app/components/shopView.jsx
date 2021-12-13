import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useContext } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ProductConsumer } from "../context";
import { colors } from "../global/colors";
import { Picker } from "@react-native-picker/picker";
import { cartContext } from "../context/cart";
export default function ShopView({ detail }, props) {
  const { cart } = useContext(cartContext);
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <View style={styles.container}>
            {value.shopResponse !== "" ? (
              <Text>{value.shopResponse.error}</Text>
            ) : null}
            <View style={styles.imageView}>
              <Image style={styles.images} source={detail.path} />
              <Text style={styles.title}>{detail.title}</Text>
              <Picker
                style={styles.picker}
                onValueChange={(itemValue, index) => value.setPrice(itemValue)}
              >
                <Picker.Item label="10" value="10" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="40" value="40" />
                <Picker.Item label="50" value="50" />
                <Picker.Item label="60" value="60" />
                <Picker.Item label="70" value="70" />
                <Picker.Item label="80" value="80" />
                <Picker.Item label="90" value="90" />
                <Picker.Item label="100" value="100" />
                <Picker.Item label="120" value="120" />
                <Picker.Item label="140" value="140" />
              </Picker>
              <TouchableOpacity onPress={() => value.saveService(detail)}>
                <Image
                  style={styles.plus}
                  source={require("../assets/plus.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    </ProductConsumer>
  );
}
export function AddView({ detail }) {
  const { cart } = useContext(cartContext);
  return (
    <ProductConsumer>
      {(value) => {
        return (
          <View style={styles.addImageView}>
            <Text style={styles.title}>{detail.title}</Text>
            <TouchableOpacity onPress={() => value.removeService(detail)}>
              <Ionicons name="remove-circle" size={35} color="#B80F0A" />
            </TouchableOpacity>
          </View>
        );
      }}
    </ProductConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tertiaryColor,
    justifyContent: "center",
  },
  images: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  imageView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d4ebf2",
    width: "80%",
    borderRadius: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 5,
    alignSelf: "center",
    justifyContent: "space-around",
  },
  addImageView: {
    flexDirection: "row",
    backgroundColor: "#d4ebf2",
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 5,
    alignSelf: "center",
    justifyContent: "space-around",
  },
  plus: {
    width: 30,
    height: 30,
  },
  picker: {
    width: 30,
    height: 30,
  },
});
