import { create } from 'zustand';

import { AlertSlice, alertSlice } from './slices/alertSlice';
import {
  ProjectAuthKeySlice,
  projectAuthKeySlice,
} from './slices/projectAuthKeySlice';
import { SessionUserSlice, sessionUserSlice } from './slices/sessionUserSlice';

type StoreState = AlertSlice & SessionUserSlice & ProjectAuthKeySlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...alertSlice(...a),
  ...sessionUserSlice(...a),
  ...projectAuthKeySlice(...a),
}));
