import { create } from "zustand";

const logInStore = create((set) => ({
  logIn: false,
  setlogIn: () => set((state) => ({ logIn: true })),
  setlogOut: () => set((state) => ({ logIn: false })),
}));
export default logInStore;
