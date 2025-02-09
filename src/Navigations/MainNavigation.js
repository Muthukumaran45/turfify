import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllScreen } from "./ScreenCollections";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerShown: false,
                animation: "slide_from_right"
            })}
            initialRouteName={"LoginScreen"}
        >
            {AllScreen.map((item, index) => {
                return (
                    <Stack.Screen
                        key={index}
                        name={item.name}
                        component={item.component}
                    />
                );
            })}
        </Stack.Navigator>
    );
};

export default MainNavigation;