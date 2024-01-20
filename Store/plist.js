//zustand for cart
import { create } from "zustand";

const plist = create((set) => ({
  list: [],
  searchItem: (val) => set((state) => ({ list: val })),
}));
export default plist;
