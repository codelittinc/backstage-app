import { StateCreator } from "zustand";

export interface SessionUserSlice {
  sessionUser?: SessionUser | null;
  setSessionUser: (sessionUser: SessionUser) => void;
}

export const sessionUserSlice: StateCreator<SessionUserSlice> = (set) => ({
  sessionUser: null,
  setSessionUser: async (sessionUser: SessionUser) => {
    set({ sessionUser: sessionUser });
  },
});
