import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Gamepad2Icon, HouseIcon, UserRoundIcon, LaptopMinimalCheckIcon } from 'lucide-react-native';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

// Screens
import HomeScreen from '../Screens/BottomTabScreens/HomeScreen';
import ProfileScreen from '../Screens/BottomTabScreens/ProfileScreen';
import BookingScreen from '../Screens/BottomTabScreens/BookingScreen';
import GamesScreen from '../Screens/BottomTabScreens/GamesScreen';

// Packages
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View className='flex-1 items-center justify-center'>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

// Custom Tab Bar Icon (ensures proper alignment)
const TabBarIcon = ({ IconComponent, label, color, focused }) => {
  return (
    <View className='items-center justify-center'>
      <IconComponent
        absoluteStrokeWidth={true}
        strokeWidth={2}
        color={focused ? color : color}
        fill={focused ? color : "none"}
        size={hp(3.5)}
      />
      {/* <Text style={{ fontSize: hp(1.5), color: focused ? "#378E26" : color, marginTop: hp(0.5) }}>
        {label}
      </Text> */}
    </View>
  );
};

export const CustomBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: hp(9),
          position: 'absolute',
          paddingBottom: hp(1),
        },
        tabBarLabelStyle: { fontSize: hp(1.8) },
        tabBarActiveTintColor: "#378E26",
        tabBarInactiveTintColor: "#A8A8A8",
        tabBarPressColor: "transparent",
        tabBarHideOnKeyboard: true,
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon IconComponent={HouseIcon} color={color} focused={focused} />
          ),
        }}
      />

      {/* Games Tab */}
      <Tab.Screen
        name="Games"
        component={GamesScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon IconComponent={Gamepad2Icon} color={color} focused={focused} />
          ),
        }}
      />

      {/* Booking Tab */}
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon IconComponent={LaptopMinimalCheckIcon} color={color} focused={focused} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon IconComponent={UserRoundIcon} color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

{/* <Tab.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    tabBarButton: (props) => <CustomTabBarButton {...props} />,
    tabBarIcon: ({ color, focused }) => (
      <TabBarIcon IconComponent={UserRoundIcon} label="Profile" color={color} focused={focused} />
    ),
  }}
/> */}
