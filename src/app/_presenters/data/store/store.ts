import { create } from "zustand";

import { AlertSlice, alertSlice } from "./slices/alertSlice";
import { SessionUserSlice, sessionUserSlice } from "./slices/sessionUserSlice";

type StoreState = AlertSlice & SessionUserSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...alertSlice(...a),
  ...sessionUserSlice(...a),
}));
