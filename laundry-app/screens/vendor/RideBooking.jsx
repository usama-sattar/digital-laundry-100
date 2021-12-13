import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { TextInput, StyleSheet, Dimensions } from "react-native";
import { ProductConsumer } from "../../context";
window.navigator.userAgent = "react-native";
import { colors } from "../../global/colors";
import { Button } from "react-native-elements";
import axios from "axios";
import { API } from "../../global/constants";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import fareComponent from "../../components/fare";
import io from "socket.io-client/dist/socket.io";
import { Overlay, Image } from "react-native-elements";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function RideBooking({ navigation }) {
  const [region, setRegion] = useState();
  const [pickUp, setPickUp] = useState({});
  const [dropOff, setDropOff] = useState({});
  const [fare, setFare] = useState();
  const [nearby, setNearby] = useState([]);
  const [visible, setVisible] = useState(false);
  const LatitudeDelta = 0.0922;
  const AspectRatio = width / height;
  const LongitudeDelta = AspectRatio * LatitudeDelta;
  const socket = useRef();

  useEffect(() => {
    socket.current = io(`${API}`);
  }, []);
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    getNearby();
  }, [region]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const combineFunction = () => {
    toggleOverlay();
    calculateFare();
  };

  const getNearby = async () => {
    if (region) {
      const result = await axios.get(
        `${API}/booking/nearby/${region.longitude}/${region.latitude}`
      );
      const data = await result.data;
      setNearby(data);
    }
  };
  const bookRide = async () => {
    const nearbyRiders = nearby;
    const nearbyRider = await nearbyRiders[
      Math.floor(Math.random() * nearbyRiders.length)
    ];
    const payload = {
      data: {
        pickUpData: {
          address: pickUp.description,
          latitude: pickUp.lat,
          longitude: pickUp.lng,
        },
        dropOffData: {
          address: dropOff.description,
          latitude: dropOff.lat,
          longitude: dropOff.lng,
        },
        fare: fare,
        status: "pending",
      },
      nearData: {
        socketId: nearbyRider.socketId,
        riderId: nearbyRider.riderId,
        latitude: nearbyRider.coordinate.coordinates[1],
        longitude: nearbyRider.coordinate.coordinates[0],
      },
    };
    const response = await axios.post(`${API}/booking/post`, {
      payload,
    });
    if (response) {
      navigation.navigate("FindRiderScreen", { socket: socket });
    }
  };
  const calculateFare = () => {
    const fareNumbers = {
      baseFare: 10.0,
      timeRate: 1.8,
      distanceRate: 4.0,
      surge: 1,
    };
    axios
      .get("https://maps.googleapis.com/maps/api/distancematrix/json", {
        params: {
          origins: pickUp.lat + "," + pickUp.lng,
          destinations: dropOff.lat + "," + dropOff.lng,
          mode: "driving",
          key: "AIzaSyCSCRz0dn9b8tujCwtYNcgS--DSZ-cDBN0",
        },
      })
      .then(async function (response) {
        const fareAmount = await fareComponent(
          fareNumbers.baseFare,
          fareNumbers.timeRate,
          response.data.rows[0].elements[0].duration.value,
          fareNumbers.distanceRate,
          response.data.rows[0].elements[0].distance.value,
          fareNumbers.surge
        );
        setFare(fareAmount);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getLocation = async () => {
    await Location.installWebGeolocationPolyfill();
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          latitudeDelta: 0.0922,
          longitudeDelta: LongitudeDelta,
        });
      },
      (error) => {
        alert(JSON.stringify(error));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.pickUp}>
        <GooglePlacesAutocomplete
          placeholder="Pick Up"
          minLength={2}
          autoFocus={false}
          fetchDetails={true}
          listViewDisplayed="auto"
          renderDescription={(row) => row.description}
          returnKeyType={"search"}
          onPress={(data, details = null) => {
            setPickUp({
              lat: details.geometry.location.lat,
              lng: details.geometry.location.lng,
              description: data.description,
            });
          }}
          query={{
            key: "AIzaSyCSCRz0dn9b8tujCwtYNcgS--DSZ-cDBN0",
            language: "en",
          }}
          GooglePlacesDetailsQuery={{
            fields: ["formatted_address", "geometry"],
          }}
        />
      </View>
      <View style={styles.dropOff}>
        <GooglePlacesAutocomplete
          placeholder="Drop Off"
          minLength={2}
          autoFocus={false}
          fetchDetails={true}
          listViewDisplayed="auto"
          renderDescription={(row) => row.description}
          returnKeyType={"search"}
          onPress={(data, details = null) => {
            setDropOff({
              lat: details.geometry.location.lat,
              lng: details.geometry.location.lng,
              description: data.description,
            });
          }}
          query={{
            key: "AIzaSyCSCRz0dn9b8tujCwtYNcgS--DSZ-cDBN0",
            language: "en",
          }}
          GooglePlacesDetailsQuery={{
            fields: ["formatted_address", "geometry"],
          }}
        />
      </View>

      <View style={styles.fareBtn}>
        {console.log(pickUp)}
        {Object.keys(pickUp).length === 0 ||
        Object.keys(dropOff).length === 0 ? null : (
          <Button title="Calculate Fare" onPress={combineFunction} />
        )}
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          width: 250,
          height: 250,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>Ride Fare</Text>
        <Text style={{ fontSize: 20, marginTop: 20 }}>Rs. {fare}</Text>
        <View style={styles.btn}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primaryColor,
              borderRadius: 100,

              padding: 15,
            }}
            onPress={bookRide}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Go!</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      {region && (
        <MapView
          loadingEnabled={true}
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
        >
          {nearby.length > 0
            ? nearby.map((marker, index) => (
                <MapView.Marker
                  key={index}
                  image={require("../../assets/bike.png")}
                  style={{ width: 25, height: 25 }}
                  coordinate={{
                    latitude: marker.coordinate.coordinates[1],
                    longitude: marker.coordinate.coordinates[0],
                    latitudeDelta: 0.0922,
                    longitudeDelta: LongitudeDelta,
                  }}
                />
              ))
            : console.log("null")}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height,
  },
  btn: {
    position: "absolute",
    right: 30,
    bottom: 30,
    zIndex: 999,
  },
  dropOff: {
    position: "absolute",
    top: 80,
    left: 0,
    zIndex: 999,
    width: "90%",
    marginHorizontal: 20,
  },
  pickUp: {
    position: "absolute",
    top: 20,
    left: 0,
    zIndex: 999,
    width: "90%",
    marginHorizontal: 20,
  },
  fareBtn: {
    position: "absolute",
    width: 200,
    zIndex: 999,
    alignSelf: "center",
    bottom: 20,
  },
});
