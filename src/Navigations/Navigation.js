import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

// screens
import MainNavigation from "./MainNavigation";

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default Navigation;