import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "@state/storage";
import { useAuthStore } from "@state/authStore";

export const customerLogin = async (phone: string) => {
  try {
    console.log("customerLogin apiiiii", phone);
    const response = await axios.post(
      "http://localhost:3000/api/customer/login",
      { phone }
    );
    const { accessToken, refereshToken, customer } = response.data;
    tokenStorage.set("accessToken", accessToken);
    tokenStorage.set("refreshToken", refereshToken);
    const { setUser } = useAuthStore.getState();
    setUser(customer);
  } catch (error) {
    console.log("Login Error", error);
  }
};
