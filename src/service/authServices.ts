import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "@state/storage";
import { useAuthStore } from "@state/authStore";
import { resetAndNavigate } from "@utils/NavigationUtils";
import { appAxios } from "@service/apiInterceptors";

export const customerLoginAPI = async (phone: string) => {
  const response = await axios.post(`${BASE_URL}/customer/login`, { phone });

  const { accessToken, refershToken, customer } = response.data;
  tokenStorage.set("accessToken", accessToken);
  tokenStorage.set("refreshToken", refershToken);
  const { setUser } = useAuthStore.getState();
  console.log("customer", customer);
  setUser(customer);
};

export const getDeliveryPartnerLoginAPI = async (
  email: string,
  password: string
) => {
  const response = await axios.post(`${BASE_URL}/delivery/login`, {
    email,
    password,
  });
  console.log("response deliveryParter", response.data);
  const { accessToken, refershToken, deliveryParter } = response.data;
  tokenStorage.set("accessToken", accessToken);
  tokenStorage.set("refreshToken", refershToken);
  const { setUser } = useAuthStore.getState();
  console.log("deliveryParter", deliveryParter);
  setUser(deliveryParter);
};

export const refresh_tokensAPI = async () => {
  try {
    const refreshToken = tokenStorage.getString("refreshToken");
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });

    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refreshToken;

    tokenStorage.set("accessToken", new_access_token);
    tokenStorage.set("refreshToken", new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log("REFRESH TOKEN ERROR", error);
    tokenStorage.clearAll();
    resetAndNavigate("CustomerLogin");
  }
};

export const refetchUserAPI = async (setUser: any) => {
  try {
    const response = await appAxios.get(`/user`);
    setUser(response.data.user);
  } catch (error) {
    console.log("Login Error ", error);
  }
};
