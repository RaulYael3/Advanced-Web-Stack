import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserState, UserActions } from "./types";

export const useUserStore = create<UserState & UserActions>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        isLoading: false,
        error: null,
        setUser: (user) => set({ currentUser: user }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
      }),
      {
        name: "user-storage",
      },
    ),
  ),
);
