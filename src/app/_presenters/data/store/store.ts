import { create } from "zustand";
import { alertSlice, AlertSlice } from "./slices/alertSlice";

type StoreState = AlertSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...alertSlice(...a),
}));
