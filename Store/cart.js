//zustand for cart
import { create } from "zustand";

const cartStore = create((set) => ({
  cart: 0,
  increaseCartItem: (val) => set((state) => ({ cart: val + 1 })),
  decreaseCartItem: (val) => set((state) => ({ cart: val - 1 })),
}));
export default cartStore;
