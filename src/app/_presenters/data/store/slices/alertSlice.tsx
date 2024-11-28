import { StateCreator } from 'zustand';

import { ApiError } from '@/providers/query.provider';

import { ApiError } from "@/providers/query.provider";

interface Alert {
  autoHideDuration?: number;
  bgWhite?: boolean;
  color?: string;
  content: string;
  dateTime?: string;
  icon?: string;
  title: string;
}

export interface AlertSlice {
  alert: Alert | null;
  hideAlert: () => void;
  showAlert: (alert: Alert) => void;
  showSaveErrorAlert: (err: ApiError) => void;
  showSaveSuccessAlert: () => void;
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
        color: 'success',
        title: 'Success!',
        content: 'Your changes have been saved!',
      },
    });
  },
  showSaveErrorAlert: async (err: ApiError) => {
    set({
      alert: {
        color: 'error',
        title: 'Error!',
        content: `There was an error while saving. Error: ${JSON.stringify(
          err
        )}`,
        autoHideDuration: 10000,
      },
    });
  },
});
