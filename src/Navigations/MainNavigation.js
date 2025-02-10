import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllScreen } from "./ScreenCollections";

const Stack = createNativeStackNavigator();

// Animation mapping for different screens
const screenAnimations = {
    CricketScreen: "slide_from_bottom",
    BadmintonScreen: "slide_from_bottom",
    FootballScreen: "slide_from_bottom",
    SwimmingScreen: "slide_from_bottom", 
    TennisScreen: "slide_from_bottom",
};

const MainNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                animation: screenAnimations[route.name] || "slide_from_right" 
            })}
            initialRouteName={"LoginScreen"}
        >
            {AllScreen.map((item, index) => (
                <Stack.Screen
                    key={index}
                    name={item.name}
                    component={item.component}
                />
            ))}
        </Stack.Navigator>
    );
};

export default MainNavigation;
