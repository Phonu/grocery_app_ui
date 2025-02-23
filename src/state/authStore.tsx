import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mmkvStorage } from "./storage";

interface authStore {
  user: Record<string, any> | null;
  setUser: (user: any) => void;
  currentOrder: Record<string, any> | null;
  setCurrrentOrder: (order: any) => void;
  logout: () => void;
}

// zustand follow function currrying method
export const useAuthStore = create<authStore>()(
  persist(
    (set, get) => ({
      user: null,
      currentOrder: null,
      setUser: (user: any) => set({ user: user }),
      setCurrrentOrder: (order: any) => set({ currentOrder: order }),
      logout: () => set({ user: null, currentOrder: null }),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => mmkvStorage) }
  )
);
