import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';  // For other icons
import Ionicons from 'react-native-vector-icons/Ionicons';  // For Ionicons
import { View, TouchableWithoutFeedback } from 'react-native';

// Screens
import HomeScreen from '../Screens/BottomTabScreens/HomeScreen';
import ProfileScreen from '../Screens/BottomTabScreens/ProfileScreen';
import BookingScreen from '../Screens/BottomTabScreens/BookingScreen';
import GamesScreen from '../Screens/BottomTabScreens/GamesScreen';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

// Custom Tab Button with top border indicator
const CustomTabBarButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {focused && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: hp(0.3),
              backgroundColor: '#378E26',
              borderRadius: hp(50)
            }}
          />
        )}
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

// Custom Icon Renderer
const TabBarIcon = ({ name, IconComponent, color, focused }) => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <IconComponent
      name={name}
      size={hp(3)}
      color={focused ? color : "#495057"}
    />
  </View>
);

export const CustomBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: hp(10),
          position: 'absolute',
          paddingBottom: hp(2),
        },
        tabBarLabelStyle: { fontSize: hp(1.8) },
        tabBarActiveTintColor: "#378E26",
        tabBarInactiveTintColor: "#495057",
        tabBarPressColor: "transparent",
        tabBarHideOnKeyboard: true,
      }}
    >
      {/* Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              IconComponent={Ionicons} 
              name={focused ? "home" : "home-outline"} 
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      {/* Games */}
      <Tab.Screen
        name="Games"
        component={GamesScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              IconComponent={Ionicons} 
              name={focused ? "game-controller" : "game-controller-outline"} 
              color={color} 
              focused={focused}
            />
          ),
        }}
      />

      {/* Booking */}
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              IconComponent={Ionicons} 
              name={focused ? "calendar" : "calendar-outline"} 
              color={color} 
              focused={focused}
            />
          ),
        }}
      />

      {/* Profile */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              IconComponent={FontAwesome} 
              name={focused ? "user-circle" : "user-circle-o"} 
              color={color} 
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
