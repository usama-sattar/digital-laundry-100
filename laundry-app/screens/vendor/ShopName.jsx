import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { colors } from "../../global/colors";
import axios from "axios";
import { API } from "../../global/constants";
import * as ImagePicker from "expo-image-picker";

export default function ShopName({ navigation, route }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [account, setAccount] = useState("");
  const [shopImage, setShopImage] = useState("");
  const [email, setEmail] = useState("");
  const { coordinates, location } = route.params;

  console.log(coordinates);
  // const openImageLibrary = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Sorry, we need camera roll permissions to make this work!");
  //   }
  //   if (status === "granted") {
  //     const response = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //     });
  //     console.log(response);
  //     if (!response.cancelled) {
  //       setShopImage(response.uri);
  //     }
  //   }
  // };
  const submitDetails = async () => {
    if (name.length < 4) {
      Alert.alert("Name should contain more than 3 letters");
      return;
    }
    if (!address.trim()) {
      Alert.alert("Address cannot be empty");
      return;
    }
    if (!account.trim()) {
      Alert.alert("Account Info cannot be empty");
      return;
    }
    let regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) {
      Alert.alert("Invalid email");
      return;
    }
    // const formData = new FormData();
    // formData.append("file", {
    //   name: new Date() + "_image",
    //   uri: shopImage.uri,
    //   type: "image/jpg",
    // });

    const response = await axios.get(`${API}/shop/find/${name}`);
    const result = await response.data;
    if (result === true) {
      Alert.alert("shop name already registered");
    } else {
      navigation.navigate("CreateShop", {
        name: name,
        address: address,
        account: account,
        location: location,
        coordinates: coordinates,
        email: email,
        //formData: formData,
      });
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: colors.tertiaryColor,
        justifyContent: "center",
      }}
    >
      {/* <TouchableOpacity
        onPress={openImageLibrary}
        style={styles.uploadBtnContainer}
      >
        {shopImage ? (
          <Image
            source={{ uri: shopImage }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Text style={styles.uploadBtn}>Upload Shop Image</Text>
        )}
      </TouchableOpacity> */}

      <Image
        style={{
          width: 300,
          height: 300,
          marginVertical: 20,
          alignSelf: "center",
        }}
        source={require("../../assets/vendor.png")}
      />

      <TextInput
        placeholder="store name"
        onChangeText={(text) => setName(text)}
        style={{
          borderWidth: 1,
          padding: 5,
          borderRadius: 15,
          backgroundColor: "white",
          paddingLeft: 10,
          width: "90%",
          alignSelf: "center",
        }}
      />
      <TextInput
        placeholder="address"
        onChangeText={(text) => setAddress(text)}
        style={{
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
          borderRadius: 15,
          backgroundColor: "white",
          paddingLeft: 10,
          marginTop: 10,
          width: "90%",
          alignSelf: "center",
        }}
      />
      <TextInput
        placeholder="email"
        onChangeText={(text) => setEmail(text)}
        style={{
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
          borderRadius: 15,
          backgroundColor: "white",
          paddingLeft: 10,
          marginTop: 10,
          width: "90%",
          alignSelf: "center",
        }}
      />
      <Text style={{ marginHorizontal: 30, color: "gray" }}>
        we will notify whenver you receive new order
      </Text>
      <TextInput
        placeholder="account"
        onChangeText={(text) => setAccount(text)}
        style={{
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
          borderRadius: 15,
          backgroundColor: "white",
          paddingLeft: 10,
          marginTop: 10,
          width: "90%",
          alignSelf: "center",
        }}
      />

      <View>
        <Button
          title="Next "
          buttonStyle={{
            backgroundColor: colors.primaryColor,
            width: "30%",
            alignSelf: "center",
            borderRadius: 10,
            marginVertical: 20,
          }}
          onPress={() => submitDetails()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
});
