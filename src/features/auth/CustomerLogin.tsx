import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
  Keyboard,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";

import CustomSafeAreaView from "@components/global/CustomSafeAreaView";
import ProductSlider from "@components/login/ProductSlider";
import { Colors, Fonts, lightColors } from "@utils/Constants";
import CustomText from "@components/ui/CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { resetAndNavigate } from "@utils/NavigationUtils";
import useKeyboardOffsetHeight from "@utils/useKeyboardOffsetHeight";
import CustomInput from "@components/ui/CustomInput";
import CustomButton from "@components/ui/CustomButton";
import { customerLoginAPI } from "@service/authServices";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const bottomColors = [...lightColors].reverse();

const CustomerLogin = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  useEffect(() => {
    console.log("get called on animation");
    if (keyboardOffsetHeight === 0) {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animationValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  const handleGesture = ({ nativeEvent }: any) => {
    console.log("nativeEvent", nativeEvent);
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction = "";

      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? "right" : "left";
      } else {
        direction = translationY > 0 ? "down" : "up";
      }
      console.log(direction);
      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      console.log(newSequence);

      if (newSequence?.join(" ") === "up up down left right") {
        resetAndNavigate("DeliveryLogin");
      }
    }
  };

  const handleAuth = async () => {
    console.log("handleAuthhandleAuthhandleAuth");
    Keyboard.dismiss();
    setLoading(true);
    try {
      await customerLoginAPI(phoneNumber);
      resetAndNavigate("ProductDashboard");
    } catch (error) {
      Alert.alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <GestureHandlerRootView style={[styles.container]}>
    <View style={styles.container}>
      <SafeAreaView />
      <ProductSlider />
      <PanGestureHandler onHandlerStateChange={handleGesture}>
        <Animated.ScrollView
          bounces={false}
          style={{ transform: [{ translateY: animationValue }] }}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.subContainer}
        >
          <LinearGradient colors={bottomColors} style={styles.gradient} />
          <View style={styles.content}>
            <Image
              source={require("@assets/images/logo.jpeg")}
              style={styles.logo}
            />
            <CustomText varient="h2" fontFamily={Fonts.Bold}>
              Grocery Delivery App
            </CustomText>
            <CustomText
              varient="h5"
              fontFamily={Fonts.SemiBold}
              style={styles.text}
            >
              LogIn or signUp
            </CustomText>
            <CustomInput
              onChangeText={(text) => setPhoneNumber(text.slice(0, 10))}
              value={phoneNumber}
              onClear={() => setPhoneNumber("")}
              placeholder="Enter Phone Number"
              inputMode="numeric"
              left={
                <CustomText
                  style={styles.phoneText}
                  varient="h6"
                  fontFamily={Fonts.SemiBold}
                >
                  + 91
                </CustomText>
              }
            />
            <CustomButton
              title="Continue"
              onPress={() => handleAuth()}
              disabled={phoneNumber.length != 10}
              loading={loading}
            />
          </View>
        </Animated.ScrollView>
      </PanGestureHandler>
      <View style={styles.footer}>
        <SafeAreaView />
        <CustomText fontSize={RFValue(6)}>
          By Continuing , you agree to our Terms of service & Privacy Policy
        </CustomText>
        <SafeAreaView />
      </View>
      <TouchableOpacity
        style={styles.absoluteSwitch}
        onPress={() => resetAndNavigate("DeliveryLogin")}
      >
        <Icon name={"bike-fast"} size={RFValue(20)} color={"#000"} />
      </TouchableOpacity>
    </View>
    // </GestureHandlerRootView>
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
    // backgroundColor: "#f8f9fc",
    width: "100%",
  },
  subContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },
  gradient: {
    paddingTop: 60,
    width: "100%",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  phoneText: {
    marginLeft: 10,
  },
  absoluteSwitch: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 99,
    padding: 10,
    borderRadius: 40,
    height: 80,
    width: 80,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CustomerLogin;
