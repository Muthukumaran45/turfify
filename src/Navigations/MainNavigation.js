import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllScreen } from "./Screencollections";
import { SheetProvider } from "react-native-actions-sheet";
import axios from "axios";

import { useToast } from "react-native-toast-notifications";
const Stack = createNativeStackNavigator();

const MainNavigator = () => {

    const toast = useToast()
    const [isLoaded, setIsLoaded] = useState(false)

    const { user, clearUser } = Users()

    console.log('====================================');
    console.log(user);
    console.log('====================================');

    const Fatchdata = async () => {
        try {
            const response = await axios.get(Api.LOGIN_VALIDATE + user.employeeId)

            console.log(response.data);
            if (response.data.status == false) {
                clearUser()
            }

        } catch (error) {
            console.log(error, 'annnnn');
            const errorMessage = `An ${error.message} occurred` || 'An unknown error occurred';
            toast.show(errorMessage, {
                type: "danger",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                swipeEnabled: true,
                animationType: "slide-in",
            });
        }
    }

    useEffect(() => {
        Fatchdata()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true)
        }, 3000);
    }, [])
    
    return (

        <SheetProvider>




            <Stack.Navigator
                screenOptions={() => ({
                    headerShown: false,

                })}
                initialRouteName={

                    
                    user ?
                        "Home"
                        : "Login"

                  
                }

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





        </SheetProvider>

    );
};

export default MainNavigator;