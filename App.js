import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AnimatedSplash from "react-native-animated-splash-screen";

// Screens
import Navigation from "./src/Navigations/Navigation";

import "./global.css";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000); 
  }, []);

  return (
    <AnimatedSplash
      isLoaded={isLoaded}
      logoImage={require("./src/Assets/logo.png")} 
      backgroundColor={"#0F0D0D"}
      logoHeight={150}
      logoWidth={150}
    >
      <Navigation />
    </AnimatedSplash>
  );
};

export default App;

const styles = StyleSheet.create({});
