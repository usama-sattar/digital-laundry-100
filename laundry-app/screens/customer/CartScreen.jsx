import React, { useState, useEffect, useContext } from "react";
import { Pressable } from "react-native";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";
import { cartContext } from "../../context/cart";
import { colors } from "../../global/colors";
function Cart({ navigation, route }) {
  const { cart, increment, decrement, total, remove } = useContext(cartContext);
  const { name, id, email } = route.params;

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.95 }}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.header}>
            <Text style={{ color: "white", fontSize: 25 }}>
              Welcome to Cart
            </Text>
          </View>
          <View>
            {cart.map((item, key) => (
              <ListItem
                key={key}
                bottomDivider
                containerStyle={{ backgroundColor: colors.tertiaryColor }}
              >
                <ListItem.Content>
                  <ListItem.Subtitle
                    style={{ color: colors.textColor, fontSize: 15 }}
                  >
                    Service: {item.title}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle
                    style={{ color: colors.textColor, fontSize: 15 }}
                  >
                    Price: {item.price}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content>
                  <View>
                    <TouchableOpacity onPress={() => increment(item, key)}>
                      <Ionicons
                        name="add-circle"
                        size={25}
                        color="orange"
                      ></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => decrement(item, key)}>
                      <Ionicons
                        name="remove-circle"
                        size={25}
                        color="orange"
                      ></Ionicons>
                    </TouchableOpacity>
                  </View>
                </ListItem.Content>
                <ListItem.Content>
                  <ListItem.Subtitle
                    style={{ color: colors.textColor, fontSize: 15 }}
                  >
                    Quantity: {item.quantity}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    <TouchableOpacity onPress={() => remove(key)}>
                      <Ionicons name="trash" size={25} color={"red"}></Ionicons>
                    </TouchableOpacity>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 20, color: colors.textColor }}>
            Total Amount: {total}
          </Text>
        </View>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <Pressable
          style={
            total > 0
              ? styles.cartButton
              : [styles.cartButton, { backgroundColor: colors.lightBlue }]
          }
          onPress={() =>
            navigation.navigate("CheckoutScreen", {
              name: name,
              id: id,
              email: email,
            })
          }
          disabled={total > 0 ? false : true}
        >
          <Text style={{ marginHorizontal: 10, fontSize: 20, color: "white" }}>
            Proceed to Checkout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
  },
  header: {
    width: "100%",
    backgroundColor: colors.primaryColor,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  checkoutButton: {
    backgroundColor: colors.secondaryColor,
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  cartButton: {
    backgroundColor: colors.primaryColor,
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
export default Cart;
