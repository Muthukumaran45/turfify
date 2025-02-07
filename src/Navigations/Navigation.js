import React, { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { navigationRef } from "../Utils/NavigationUtil";
import { useCustomTheme } from "./Theme";
import MainNavigator from "./MainNavigation";

const Navigation = () => {
  
  const [isLoaded, setIsLoaded] = useState(false)
  const theme = useCustomTheme();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
      text: theme.colors.text,
      card: theme.colors.card,
      border: theme.colors.border,
      notification: theme.colors.notification,
      primary: theme.colors.primary,
    },
  };

  useEffect(()=>{
    setTimeout(() => {
      
    setIsLoaded(true)
    }, 3000);
  },[])

  return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
        
 <MainNavigator />
         

     
    </NavigationContainer>
  );
};

export default Navigation;