import { User } from "@/types/user.types";
import { create } from "zustand";

type AppStore = {
  user: User | null;
  error: Error | null;
  setUser: (user: User) => void;
  setError: (err: Error) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  error: null,
  setUser: (user) => set({ user }),
  setError: (err) => set({ error: err }),
}));
