import {
  View,
  Text,
  Keyboard,
  Alert,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import React, { FC, useState } from "react";
import axios from "axios";
import { tokenStorage } from "@state/storage";
import { useAuthStore } from "@state/authStore";
import { resetAndNavigate } from "@utils/NavigationUtils";
import CustomSafeAreaView from "@components/global/CustomSafeAreaView";
import { screenHeight } from "@utils/Scaling";
import Lottie from "lottie-react-native";
import CustomText from "@components/ui/CustomText";
import { Colors, Fonts } from "@utils/Constants";
import CustomInput from "@components/ui/CustomInput";
import Icon from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomButton from "@components/ui/CustomButton";
import { getDeliveryPartnerLoginAPI } from "@service/authServices";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DeliveryLogin: FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await getDeliveryPartnerLoginAPI(email, password);
      resetAndNavigate("DeliveryDashboard");
    } catch (error) {
      Alert.alert("DeliveryPartner Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    <CustomSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        keyboardDismissMode={"on-drag"}
      >
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <Lottie
              autoPlay
              loop
              style={styles.lottie}
              source={require("@assets/animations/delivery_man.json")}
              hardwareAccelerationAndroid
            />
          </View>
          <CustomText varient="h3" fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText varient="h6" fontFamily={Fonts.SemiBold}>
            Faster than flash⚡️
          </CustomText>

          <CustomInput
            onChangeText={setEmail}
            value={email}
            placeholder="EmailId"
            inputMode="email"
            left={
              <Icon
                name="mail"
                color={"#F8890E"}
                style={{ marginLeft: 10 }}
                size={RFValue(18)}
              />
            }
            right={false}
          />
          <CustomInput
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry
            left={
              <Icon
                name="key-sharp"
                color={"#F8890E"}
                style={{ marginLeft: 10 }}
                size={RFValue(18)}
              />
            }
            right={false}
          />

          <CustomButton
            title="Login"
            onPress={() => handleAuth()}
            loading={loading}
            disabled={false}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
    // </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  lottie: {
    height: "100%",
    width: "100%",
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: "100%",
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});

export default DeliveryLogin;
