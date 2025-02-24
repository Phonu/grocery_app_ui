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

// TODO: need to add api on service folder
export const getDeliveryPartnerLogin = async (
  email: string,
  password: string
) => {
  const response = await axios.post(
    "http://localhost:3000/api/delivery/login",
    { email, password }
  );
  console.log("response deliveryParter", response.data);
  const { accessToken, refershToken, deliveryParter } = response.data;
  tokenStorage.set("accessToken", accessToken);
  tokenStorage.set("refreshToken", refershToken);
  const { setUser } = useAuthStore.getState();
  console.log("deliveryParter", deliveryParter);
  setUser(deliveryParter);
};

const DeliveryLogin: FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await getDeliveryPartnerLogin(email, password);
      resetAndNavigate("DeliveryDashboard");
    } catch (error) {
      Alert.alert("DeliveryPartner Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
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

          {/* TODO: Need to fix this: CustomInput is not working.*/}
          {/* <CustomInput
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
          /> */}

          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="Email-Id"
            // inputMode="email"
            style={{
              height: 50,
              width: "60%",
              borderColor: "red",
              fontSize: 24,
              borderWidth: 1,
              padding: 12,
              margin: 12,
            }}
          />

          <TextInput
            onChangeText={setPassword}
            value={password}
            placeholder="password"
            // secureTextEntry
            style={{
              height: 50,
              width: "60%",
              borderColor: "red",
              fontSize: 24,
              borderWidth: 1,
              padding: 12,
            }}
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
