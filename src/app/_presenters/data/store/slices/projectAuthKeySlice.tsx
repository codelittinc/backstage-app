import { StateCreator } from "zustand";

export interface ProjectAuthKeySlice {
  projectAuthKey?: string;
  setProjectAuthKey: (projectAuthKey: string) => void;
}

export const projectAuthKeySlice: StateCreator<ProjectAuthKeySlice> = (
  set
) => ({
  projectAuthKey: undefined,
  setProjectAuthKey: async (projectAuthKey: string) => {
    set({ projectAuthKey: projectAuthKey });
  },
});
