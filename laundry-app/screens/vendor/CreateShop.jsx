import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput, StyleSheet } from "react-native";
import { ProductConsumer } from "../../context";
import { shopDetails } from "../../global/constants";
import { colors } from "../../global/colors";
import ShopView from "../../components/shopView";
import { AddView } from "../../components/shopView";
import { useEffect } from "react";

function CreateShop({ route, navigation }) {
  const { name, address, account, location, coordinates, formData, email } =
    route.params;
  return (
    <ProductConsumer>
      {(value) => {
        const data = shopDetails.filter(
          ({ title: t1 }) => !value.services.some(({ title: t2 }) => t1 === t2)
        );
        return (
          <View
            style={{
              flex: 1,
              paddingTop: 5,
              backgroundColor: colors.tertiaryColor,
            }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              style={{ flexGrow: 1 }}
            >
              <View style={{ width: "80%", alignSelf: "center", marginTop: 5 }}>
                {value.services.length > 0 ? (
                  <Text
                    style={{
                      fontSize: 20,
                      color: colors.textColor,
                      textAlign: "center",
                    }}
                  >
                    Selected Services
                  </Text>
                ) : null}
                {value.services.length > 0
                  ? value.services.map((item, index) => {
                      return <AddView key={index} detail={item} />;
                    })
                  : null}
              </View>
              <Text style={{ fontSize: 20, textAlign: "center" }}>
                Add Services
              </Text>
              {data.map((item, index) => (
                <ShopView
                  key={index}
                  detail={item}
                  name={name}
                  address={address}
                  account={account}
                  location={location}
                />
              ))}

              <TouchableOpacity
                style={styles.submit}
                onPress={() =>
                  value.createShop(
                    name,
                    address,
                    account,
                    location,
                    coordinates,
                    email,
                    formData
                  )
                }
              >
                <Text style={{ color: "white", fontSize: 20 }}>
                  Submit Details
                </Text>
              </TouchableOpacity>
              {value.created
                ? navigation.naviagte("VendorScreen", {
                    msg: "succeffully created",
                  })
                : null}
            </ScrollView>
          </View>
        );
      }}
    </ProductConsumer>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 30,
    margin: 10,
    width: "100%",
    borderBottomWidth: 1,
    padding: 5,
    color: "black",
  },
  submit: {
    marginTop: 5,
    width: "60%",
    padding: 8,
    backgroundColor: colors.primaryColor,
    alignSelf: "center",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
export default CreateShop;
