import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllScreen } from "./ScreenCollections";

const Stack = createNativeStackNavigator();

// Animation mapping for different screens
const screenAnimations = {
    CricketScreen: "slide_from_bottom",
    WishListScreen: "slide_from_right",
};

const MainNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                animation: screenAnimations[route.name] || "fade"
            })}
            initialRouteName={"WelcomeScreen"}
        >
            {AllScreen.map((item, index) => (
                <Stack.Screen
                    key={item.name}
                    name={item.name}
                    component={item.component}
                />
            ))}
        </Stack.Navigator>
    );
};

export default MainNavigation;
