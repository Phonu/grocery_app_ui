import { View, Text, StyleSheet } from "react-native";
import React, { FC, useEffect } from "react";
import { Colors } from "@utils/Constants";
import { screenHeight, screenWidth } from "@utils/Scaling";
import { navigate } from "@utils/NavigationUtils";

const SplashScreen: FC = () => {
  useEffect(() => {
    const navigateUser = async () => {
      console.log("getting useEffect");

      try {
        navigate("CustomerLogin");
        console.log("getting navigate");
      } catch (error) {
        console.log("getting error", error);
      }
    };
    const timeoutId = setTimeout(navigateUser, 1000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: "contain",
  },
});
export default SplashScreen;
