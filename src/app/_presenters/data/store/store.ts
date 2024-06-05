import { create } from "zustand";

import { AlertSlice, alertSlice } from "./slices/alertSlice";
import { SessionUserSlice, sessionUserSlice } from "./slices/sessionUserSlice";
import {
  ProjectAuthKeySlice,
  projectAuthKeySlice,
} from "./slices/projectAuthKeySlice";

type StoreState = AlertSlice & SessionUserSlice & ProjectAuthKeySlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...alertSlice(...a),
  ...sessionUserSlice(...a),
  ...projectAuthKeySlice(...a),
}));
