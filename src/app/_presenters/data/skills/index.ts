import { Skill } from "@/app/_domain/interfaces/Skill";

import { backstageApiClient } from "../auth/backstageApiAxios";

export const getSkills = async (): Promise<Skill[] | null> => {
  const { data } = await backstageApiClient.get("/skills");
  return data;
};
