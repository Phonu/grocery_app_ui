import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomSafeAreaView from "@components/global/CustomSafeAreaView";
import ProductSlider from "@components/login/ProductSlider";
import { Colors } from "@utils/Constants";
import CustomText from "@components/ui/CustomText";
import { RFValue } from "react-native-responsive-fontsize";

const CustomerLogin = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
        </CustomSafeAreaView>
        <View style={styles.footer}>
          <SafeAreaView />
          <CustomText fontSize={RFValue(6)}>
            By Continuing , you agree to our Terms of service & Privacy Policy
          </CustomText>
          <SafeAreaView />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f9fc",
    width: "100%",
  },
});
export default CustomerLogin;
