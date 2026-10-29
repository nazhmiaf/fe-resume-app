import { create } from "zustand";
import { devtools } from "zustand/middleware";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

const storedUser = getStoredUser();

export const useAuthstore = create(
  devtools((set) => ({
    user: storedUser,
    isAuthentication: !!storedUser,

    setUserData: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, isAuthentication: true });
    },

    removeUserData: () => {
      localStorage.removeItem("user");
      set({ user: null, isAuthentication: false });
    },
  })),
);
