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
  showSaveSuccessAlert: () => void;
  showSaveErrorAlert: (err: unknown) => void;
}

export const alertSlice: StateCreator<AlertSlice> = (set) => ({
  alert: null,
  showAlert: async (alert: Alert) => {
    set({ alert: alert });
  },
  hideAlert: async () => {
    set({ alert: null });
  },
  showSaveSuccessAlert: async () => {
    set({
      alert: {
        color: "success",
        title: "Success!",
        content: `your changes have been saved!`,
      },
    });
  },
  showSaveErrorAlert: async (err: unknown) => {
    set({
      alert: {
        color: "error",
        title: "Error!",
        content: `There was an error while saving. Error: ${JSON.stringify(
          err!.response.data
        )}`,
        autoHideDuration: 10000,
      },
    });
  },
});
