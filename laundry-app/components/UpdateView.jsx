import { Ionicons } from "@expo/vector-icons";
import React, { useState, useContext, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ProductConsumer } from "../context";
import { colors } from "../global/colors";
import { Picker } from "@react-native-picker/picker";
import { updateContext } from "../context/update";
import { API, shopDetails } from "../global/constants";
import ShopView from "./shopView";

export default function UpdateView({ detail }, props) {
  const { updatePrice, saveService, removeService } = useContext(updateContext);

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Text style={styles.title}>{detail.title}</Text>
        <Text style={styles.title}>{detail.price}</Text>
        <Picker
          style={styles.picker}
          onValueChange={(itemValue, index) => updatePrice(itemValue, detail)}
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
        <TouchableOpacity onPress={() => removeService(detail)}>
          <Ionicons name="remove-circle" size={35} color="#B80F0A" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export function UpdateNew() {
  const { services } = useContext(updateContext);
  const [remaining, setRemaining] = useState([]);
  useEffect(() => {
    getFilter();
  }, [services]);
  
  const getFilter = async () => {
    console.log(services);
    const data = await shopDetails.filter(
      ({ title: t1 }) => !services.some(({ title: t2 }) => t1 === t2)
    );
    setRemaining(data);
  };

  return remaining.map((item, index) => <ItemView detail={item} key={index} />);
}

function ItemView({ detail }) {
  const { updatePrice, saveService, removeService } = useContext(updateContext);
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image style={styles.images} source={detail.path} />
        <Text style={styles.title}>{detail.title}</Text>
        <Picker
          style={styles.picker}
          onValueChange={(itemValue, index) => updatePrice(itemValue, detail)}
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
        <TouchableOpacity onPress={() => saveService(detail)}>
          <Image style={styles.plus} source={require("../assets/plus.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
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
    width: "90%",
    borderRadius: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 10,
    marginBottom:10,
    alignSelf: "center",
    justifyContent: "space-around",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 10,  
    elevation: 5
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
