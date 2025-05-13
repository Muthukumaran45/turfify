import React, { useEffect } from "react";
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import { Platform, Alert, StatusBar, SafeAreaView } from "react-native";

import Navigation from "./src/Navigations/Navigation";
import useFcmStore from "./src/Zustand/useFcmStore";
import { COLORS } from "./src/Constants/Colors";

// Function to handle notification when received in foreground
const onMessageReceived = async (remoteMessage) => {
  console.log('Foreground Message:', remoteMessage);

  const channelId = await notifee.createChannel({
    id: 'important',
    name: 'Important Notifications',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'No Title',
    body: remoteMessage.notification?.body || 'No Body',
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
};

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    // console.log('FCM Token:', token);
    useFcmStore.getState().setFcmToken(token);
  } catch (error) {
    console.error('Failed to get FCM token:', error);
  }
};

const App = () => {
  useEffect(() => {
    requestUserPermission();
    getFcmToken();

    // Foreground message handler
    const unsubscribe = messaging().onMessage(onMessageReceived);

    // Background/quit state handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // Notification opened when app was in background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened from background state:', remoteMessage);
    });

    // Notification opened when app was in quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage);
        }
      });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.statusBarColor} barStyle={"dark-content"} />
      <Navigation />
    </SafeAreaView>
  )
};

export default App;
