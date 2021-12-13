import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../global/constants";
import { colors } from "../../global/colors";
import { Alert } from "react-native";
import { color } from "react-native-elements/dist/helpers";

function SignUp(props) {
  const [userType, setUserType] = useState("customer");
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [license, setLicense] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const sendCode = () => {
    if (userType === "vendor") {
      if (cnic.length < 14) {
        setModalVisible(false);
        Alert.alert("CNIC must contain 13 digits ");
        return;
      }
    }
    if (userType === "rider") {
      if (license.length < 8) {
        setModalVisible(false);
        Alert.alert("license no. must contain 8 digits ");
        return;
      }
    }
    if (!name.trim()) {
      Alert.alert("Username cannot be empty");
      setModalVisible(false);
      return;
    }
    if (!phone.trim()) {
      Alert.alert("Phone no. cannot be empty");
      setModalVisible(false);
      return;
    }
    setMessage("");
    axios
      .post(`${API}/verify/phone`, {
        number: phone,
        userType: userType,
      })
      .then((res) => {
        console.log(res.data.message);
        setMessage(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  const submitData = async () => {
    if (code.length !== 6) {
      Alert.alert("Code must contain 6 digits");
      return;
    }
    axios
      .post(`${API}/verify/code`, {
        number: phone,
        code: otp,
        name: name,
        userType: userType,
        cnic: cnic,
        license: license,
      })
      .then((res) => {
        console.log(res.data);
        setModalVisible(false);
        if (userType === "vendor") {
          AsyncStorage.setItem("vendorId", JSON.stringify(res.data._id));
          props.navigation.navigate("VendorScreen");
        } else if (userType === "customer") {
          AsyncStorage.setItem("customerId", JSON.stringify(res.data._id));
          props.navigation.navigate("MainScreenContainer");
        } else {
          AsyncStorage.setItem("riderId", JSON.stringify(res.data._id));
          props.navigation.navigate("RiderScreen");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={{ width: 100, height: 100 }}
        source={require("../../assets/signUp.png")}
      />
      <View style={styles.signUpView}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile number"
          keyboardType="numeric"
          onChangeText={(text) => {
            setPhone(text);
          }}
        />
        {message !== "" ? (
          <Text style={{ color: "red" }}>{message}</Text>
        ) : null}
        <Picker
          style={styles.picker}
          selectedValue={userType}
          onValueChange={(itemValue, index) => setUserType(itemValue)}
        >
          <Picker.Item label="Customer" value="customer" />
          <Picker.Item label="Vendor" value="vendor" />
          <Picker.Item label="Rider" value="rider" />
        </Picker>
        {userType === "vendor" ? (
          <View style={styles.vendorFields}>
            <TextInput
              style={styles.input}
              placeholder="CNIC"
              keyboardType="numeric"
              onChangeText={(text) => {
                setCnic(text);
              }}
            />
          </View>
        ) : userType === "rider" ? (
          <View style={styles.vendorFields}>
            <TextInput
              style={styles.input}
              placeholder="license No."
              onChangeText={(text) => {
                setLicense(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="CNIC"
              onChangeText={(text) => {
                setCnic(text);
              }}
            />
          </View>
        ) : null}

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalCenterView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Code</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setOtp(text)}
              />
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => submitData()}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            {
              message === "" || message === undefined
                ? setModalVisible(true)
                : setModalVisible(false);
            }
            sendCode();
          }}
        >
          <Text style={{ color: "white", alignSelf: "center" }}>Send Code</Text>
        </TouchableOpacity>
        <Text
          onPress={() => props.navigation.navigate("Login")}
          style={{ paddingTop: 10, color: colors.textColor }}
        >
          Already a member? Login
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.tertiaryColor,
  },
  picker: {
    width: 150,
    height: 50,
    marginBottom: 10,
    color: colors.textColor,
  },
  input: {
    height: 30,
    margin: 10,
    width: "80%",
    borderBottomWidth: 1,
    padding: 5,
    color: "black",
    height: 40,
    paddingLeft: 20,
  },
  signUpView: {
    flex: 0.7,
    alignItems: "center",
    marginTop: 20,
    alignSelf: "stretch",
  },
  vendorFields: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  modalCenterView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    width: "80%",
    backgroundColor: colors.secondaryColor,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: colors.textColor,
    fontSize: 15,
  },
  button: {
    padding: 10,
    elevation: 2,
    margin: 2,
    width: "50%",
    backgroundColor: colors.primaryColor,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default SignUp;
