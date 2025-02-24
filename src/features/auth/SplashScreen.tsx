import { View, Text, StyleSheet, Alert } from "react-native";
import React, { FC, useEffect } from "react";
import { Colors } from "@utils/Constants";
import { screenHeight, screenWidth } from "@utils/Scaling";
import { navigate, resetAndNavigate } from "@utils/NavigationUtils";
// import GeoLocation from "@react-native-community/geolocation";
import { useAuthStore } from "@state/authStore";
import { tokenStorage } from "@state/storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { refetchUserAPI, refresh_tokensAPI } from "@service/authServices";

// GeoLocation.setRNConfiguration({
//   skipPermissionRequests: false,
//   authorizationLevel: "always",
//   enableBackgroundLocationUpdates: true,
//   locationProvider: "auto",
// });

interface DecodedToken {
  exp: number;
}

const SplashScreen: FC = () => {
  const { user, setUser } = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString("accessToken") as string;
    const refreshToken = tokenStorage.getString("refreshToken") as string;

    // NEED TO UNCOMMENT FOR DEVELOPMENT
    // resetAndNavigate("CustomerLogin");
    // return false;

    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currentTime = Date.now() / 1000;

      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate("CustomerLogin");
        Alert.alert("Session Expired, Please login again");
        return false;
      }
      if (decodedRefreshToken?.exp < currentTime) {
        try {
          await refresh_tokensAPI();
          await refetchUserAPI(setUser);
        } catch (error) {
          console.log(error);
          Alert.alert("There is some error while refereshing token");
          return false;
        }
      }

      if (user?.role === "Customer") {
        resetAndNavigate("ProductDashboard");
        return true;
      } else {
        resetAndNavigate("DeliveryDashboard");
        return true;
      }
    }
    resetAndNavigate("CustomerLogin");
    return false;
  };

  useEffect(() => {
    const initialStartup = async () => {
      console.log("getting useEffect");

      try {
        // navigate("CustomerLogin");
        await tokenCheck();
        console.log("Token validation at initialStartup");
      } catch (error) {
        console.log("getting error", error);
      }
    };
    const timeoutId = setTimeout(initialStartup, 1000);
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
