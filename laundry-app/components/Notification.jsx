import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import axios from "axios";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}
export default function NotificationApp() {
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    if (Constants.isDevice && Platform.OS !== "web") {
      registerForPushNotificationsAsync().then((token) => {
        axios.post(`https://nativenotify.com/api/expo/key`, {
          appId: 178,
          appToken: "V5ydK0ciAMefPJpug61Oui",
          expoToken: token,
        });
      });
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) =>
          console.log(response)
        );
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }
  });
  return <></>;
}
