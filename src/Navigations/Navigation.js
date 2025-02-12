import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

// screens
import MainNavigation from "./MainNavigation";

// utils
import { navigationRef } from "../Utils/NavigationUtil";

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default Navigation;