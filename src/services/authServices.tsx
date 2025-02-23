import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "@state/storage";

export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, { phone });
    const { accessToken, refereshToken, customer } = response.data;
    tokenStorage.set("accessToken", accessToken);
    tokenStorage.set("refereshToken", refereshToken);
  } catch (error) {
    console.log("Login Error", error);
  }
};
