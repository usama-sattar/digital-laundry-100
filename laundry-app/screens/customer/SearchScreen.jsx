import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { images } from "../../global/images.js";
import { colors } from "../../global/colors";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const windowWidth = Dimensions.get("window").width;

function Searched({ route, navigation }, props) {
  const { Shops, pics } = route.params;
  const [shopIndexCheck, setShopIndexCheck] = useState("0");
  const [loading, setLoading] = useState(false);

  return loading === false ? (
    <View style={styles.container}>
      {console.log(Shops)}
      {Shops.length > 0 ? (
        <View>
          <Text
            style={{
              color: colors.textColor,
              textAlign: "center",
              fontSize: 25,
            }}
          >
            Searched: {route.params.word}
          </Text>
          <View style={{ marginTop: 5 }}>
            <FlatList
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              data={Shops}
              keyExtractor={(_, index) => {
                index.toString();
              }}
              extraData={shopIndexCheck}
              renderItem={({ item, index }) => {
                return (
                  <View
                    key={index}
                    style={styles.largeCard}
                    onPress={() => setShopIndexCheck(item._id)}
                  >
                    <Pressable
                      onPress={() => {
                        navigation.navigate("SelectedVendorScreen", {
                          data: item,
                        });
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                        }}
                      >
                        <View>
                          <Image
                            source={pics[index]}
                            style={{
                              width: "100%",
                              height: 175,
                            }}
                          />
                        </View>
                        <View
                          style={{
                            width: "100%",
                            borderRadius: 0,
                            padding: 5,
                            backgroundColor: colors.tertiaryColor,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "100%",
                              flexWrap: "wrap",
                            }}
                          >
                            <Text style={{ color: "black", fontSize: 20 }}>
                              {item.name}
                            </Text>
                            {item.average && (
                              <Text
                                style={{
                                  color: colors.primaryColor,
                                  fontSize: 15,
                                }}
                              >
                                {item.average}
                                <Ionicons
                                  name="star"
                                  size={15}
                                  color="#FFC000"
                                />
                              </Text>
                            )}

                            <Text
                              style={{
                                color: colors.primaryColor,
                                fontSize: 15,
                              }}
                            >
                              {item.location}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                );
              }}
            />
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            visible={true}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("../../no_result.json")}
            animationStyle={{ width: 200, height: 200 }}
            speed={1}
            autoPlay
            loop
          ></LottieView>
        </View>
      )}
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
  },
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    margin: 5,
  },
  smallCard: {
    width: 100,
    height: 100,
    backgroundColor: colors.tertiaryColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.lightBlue,
  },
  largeCard: {
    width: windowWidth * 0.8,
    height: 250,
    backgroundColor: colors.tertiaryColor,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "flex-start",
    borderRadius: 10,
    marginTop: 15,
    alignSelf: "center",
  },
  verticallargeCard: {
    width: "90%",
    height: 200,
    marginLeft: "5%",
    marginRight: "5%",
    alignSelf: "flex-start",
    backgroundColor: colors.tertiaryColor,
    borderRadius: 10,
    marginTop: 25,
  },
  headingText: {
    marginHorizontal: 10,
    fontSize: 20,
    color: colors.textColor,
  },
});
export default Searched;
