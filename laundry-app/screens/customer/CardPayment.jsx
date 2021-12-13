import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import axios from "axios";
import { cartContext } from "../../context/cart";
import { API } from "../../global/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../global/colors";
import { Button } from "react-native-elements";
import LottieView from "lottie-react-native";

function CardPayment({ route, navigation }) {
  return (
    <StripeProvider publishableKey="pk_test_51J56lVJIiMKnmPN2rwY9qFt8R5FTtdITJoIRU3wEASsmx31gCGK7yBuGThKyPJuZH3e2ASFwFgxWewU28AUDqpZa00BjkrySxV">
      <StripeHandler
        vendorName={route.params.name}
        vendorId={route.params.id}
        vendorEmail={route.params.email}
        navigation={navigation}
      />
    </StripeProvider>
  );
}
function StripeHandler({ vendorName, vendorId, vendorEmail, navigation }) {
  const [animation, setAnimation] = useState(false);
  const [user, setUser] = useState("");
  const [cardDetails, setCardDetails] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const { cart, total, setCart, setTotal } = useContext(cartContext);
  const { confirmPayment, loading } = useConfirmPayment();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const customer = await AsyncStorage.getItem("customerId");
    if (customer) {
      const customerId = await JSON.parse(customer);
      setUser(customerId);
    }
  };
  const paymentHandle = async () => {
    if (!cardDetails?.complete) {
      Alert.alert("Error", "Enter Detail Please");
      return;
    }
    if (!name.trim()) {
      Alert.alert("Please Enter Name");
      return;
    }
    if (!contact.trim()) {
      Alert.alert("Please Enter Address");
      return;
    }
    if (!address.trim()) {
      Alert.alert("Please Enter Valid Address");
      return;
    }
    if (contact.length < 11) {
      Alert.alert("contact number must contain 11 digits");
      return;
    }
    const billing = {
      name: name,
      email: email,
      cart: cart,
      address: address,
      contact: contact,
      price: total,
      user: user,
      vendor: vendorName,
      vendorId: vendorId,
    };
    const response = await axios.post(
      `${API}/customers/create-payment`,
      billing
    );
    try {
      const { paymentIntent, error } = await confirmPayment(response.data, {
        type: "Card",
        billingDetails: { billing },
      });
      const responsePost = await axios.post(`${API}/customers/order`, {
        customerId: user,
        name,
        email,
        address,
        contact,
        cart,
        total,
        status: "pending",
        vendor: vendorName,
        vendorId: vendorId,
      });
      const result = await responsePost.data;
      const mail = axios.post(`${API}/notification/sendMail`, {
        email: vendorEmail,
      });
      try {
        if (result) {
          setCart([]);
          setTotal(0);
          setAnimation(true);
          setTimeout(() => {
            navigation.navigate("MainScreenContainer");
          }, 4000);
        } else {
          Alert.alert("Error", "Unable to make Payment");
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {animation ? (
        <LottieView
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../../success.json")}
          speed={1}
          autoPlay
        ></LottieView>
      ) : (
        <View>
          <View>
            <TextInput
              placeholder="name"
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
              placeholder="contact number"
              onChangeText={(text) => setContact(text)}
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
              keyboardType="numeric"
            />
            <View>
              <CardField
                placeholder={{ number: "4242 4242 4242 4242" }}
                postalCodeEnabled={false}
                style={styles.cardField}
                cardStyle={{ backgroundColor: "white", borderRadius: 5 }}
                onCardChange={(cardDetail) => {
                  setCardDetails(cardDetail);
                }}
              />
            </View>
          </View>
          <View>
            <Button
              title="Pay"
              buttonStyle={{
                backgroundColor: colors.primaryColor,
                width: "90%",
                alignSelf: "center",
              }}
              onPress={paymentHandle}
              disabled={loading}
            />
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.secondaryColor,
  },
  cardField: {
    width: "90%",
    marginVertical: 10,
    height: 50,
    alignSelf: "center",
  },
});
export default CardPayment;
