import { StateCreator } from "zustand";

interface Alert {
  color?: string;
  icon?: string;
  title: string;
  dateTime?: string;
  content: string;
  bgWhite?: boolean;
  autoHideDuration?: number;
}

export interface AlertSlice {
  alert: Alert | null;
  showAlert: (alert: Alert) => void;
  hideAlert: () => void;
}

export const alertSlice: StateCreator<AlertSlice> = (set) => ({
  alert: null,
  showAlert: async (alert: Alert) => {
    set({ alert: alert });
  },
  hideAlert: async () => {
    set({ alert: null });
  },
});
