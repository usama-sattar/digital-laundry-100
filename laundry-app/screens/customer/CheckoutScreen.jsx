import React, { Component, useContext, useState } from "react";
import { Pressable } from "react-native";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Swiper from "react-native-swiper";
import { Image } from "react-native-elements";
import { cartContext } from "../../context/cart";
import { colors } from "../../global/colors";
export default function Checkout({ navigation, route }) {
  const { total } = useContext(cartContext);
  const [visibleSwiper, setVisibleSwiper] = useState(true);
  const { name, id, email } = route.params;
  let swiper = null;
  if (visibleSwiper) {
    swiper = (
      <View
        style={{
          height: "40%",
        }}
      >
        <Swiper
          dotColor={"white"}
          activeDotColor={"#FF0A0A"}
          horizontal={true}
          loop={true}
          autoplay={true}
          bounces={true}
          removeClippedSubviews={false}
        >
          <View style={styles.slideContainer}>
              <Image

                source={require("../../assets/credit-card.png")}
                style={{ width: 200, height: 200 }}
                PlaceholderContent={<ActivityIndicator />}
              />
          </View>
          <View style={styles.slideContainer}>
            <Image
              source={require("../../assets/debit-card.png")}
              style={{ width: 200, height: 200 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.slideContainer}>
            <Image
              source={require("../../assets/credit-card-2.png")}
              style={{ width: 200, height: 200 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        </Swiper>
      </View>
    );
  } else {
    swiper = <View></View>;
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 40, color: colors.textColor }}>
          Rs. {total}
        </Text>
      </View>

      {swiper}
      <View>
        <View style={{ marginHorizontal: 15 }}>
          <View>
            <Pressable
              style={styles.paymentCard}
              onPress={() =>
                navigation.navigate("CardScreen", {
                  name: name,
                  id: id,
                  email: email,
                })
              }
            >
              <Text style={styles.textStyle}>Credit Card</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.secondaryColor,
  },
  paymentCard: {
    width: "90%",
    borderRadius: 50,
    marginTop: 5,
    backgroundColor: colors.primaryColor,
    height: 80,
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  slideContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 25,
    color: "white",
  },
});
