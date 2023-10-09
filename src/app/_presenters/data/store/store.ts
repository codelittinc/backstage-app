import { create } from "zustand";
import { alertSlice, AlertSlice } from "./slices/alertSlice";
import { sessionUserSlice, SessionUserSlice } from "./slices/sessionUserSlice";

type StoreState = AlertSlice & SessionUserSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...alertSlice(...a),
  ...sessionUserSlice(...a),
}));
