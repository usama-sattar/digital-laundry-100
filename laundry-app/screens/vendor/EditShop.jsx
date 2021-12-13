import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { ProductConsumer } from "../../context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, shopDetails } from "../../global/constants";
import { colors } from "../../global/colors";
import UpdateView from "../../components/UpdateView";
import { UpdateNew } from "../../components/UpdateView";
import { updateContext } from "../../context/update";
import { color } from "react-native-elements/dist/helpers";

export default function EditShop({ navigation }) {
  const [vendor, setVendor] = useState("");
  const [loading, setLoading] = useState(false);
  const { shop, services, setShop, setServices } = useContext(updateContext);

  useEffect(() => {
    getStorage();
  }, []);

  const getStorage = async () => {
    const vendor = await AsyncStorage.getItem("vendorId");
    if (vendor) {
      const vendorId = await JSON.parse(vendor);
      await getData(vendorId);
      setVendor(vendorId);
    }
  };
  const getData = async (vendorId) => {
    const result = await axios.get(`${API}/shop/${vendorId}`);
    const data = await result.data;
    setShop(data);
    setServices(data.services);
    setLoading(true);
  };
  const updateShop = async () => {
    const shop_id = await shop._id;
    const result = await axios.post(`${API}/shop/update/${shop_id}`, {
      services: services,
    });
    const data = await result.data;
    console.log(data);
  };

  return loading ? (
    <View style={styles.container}>
      <ProductConsumer>
        {(value) => {
          return (
            <View
              style={{
                flex: 1,
                paddingTop: 5,
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 15 }}>
                {shop.name}
              </Text>
              {shop !== {} ? (
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1 }}
                  style={{ flexGrow: 1 }}
                >
                  <View
                    style={{ width: "80%", alignSelf: "center", marginTop: 5 }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        color: colors.textColor,
                      }}
                    >
                      Existing Services
                    </Text>
                    {services.length > 0
                      ? services.map((item, index) => (
                          <UpdateView key={index} detail={item} />
                        ))
                      : null}
                  </View>

                  <View
                    style={{ width: "80%", alignSelf: "center", marginTop: 5 }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: colors.textColor,
                        textAlign: "center",
                      }}
                    >
                      Add New Services
                    </Text>
                    <View>{services.length > 0 ? <UpdateNew /> : null}</View>
                  </View>
                  <View
                    style={{ width: "80%", alignSelf: "center", marginTop: 5 }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "500",
                        color: colors.textColor,
                      }}
                    >
                      New Services
                    </Text>
                    {value.services.length > 0
                      ? value.services.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={{ fontSize: 18, color: "white" }}
                            >
                              <Text key={index} style={{ color: "white" }}>
                                {item.title}
                              </Text>
                            </View>
                          );
                        })
                      : null}
                  </View>
                  <TouchableOpacity
                    style={styles.submit}
                    onPress={() => updateShop()}
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Update Details
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              ) : (
                <View>
                  <Text>Create Shop First</Text>
                </View>
              )}
            </View>
          );
        }}
      </ProductConsumer>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Nothing to update, Create Shop First</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
  },
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
