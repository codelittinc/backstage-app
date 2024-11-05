import { Skill, SkillAnalytics } from "@/app/_domain/interfaces/Skill";

import { backstageApiClient } from "../auth/backstageApiAxios";

export const getSkills = async (): Promise<Skill[] | null> => {
  const { data } = await backstageApiClient.get("/skills");
  return data;
};

export const createSkill = async (skill: Skill): Promise<Skill | null> => {
  const { data } = await backstageApiClient.post("/skills", skill);
  return data;
};

export const getSkillsAnalytics = async (search: string): Promise<SkillAnalytics[] | null> => {
  const { data } = await backstageApiClient.get("/analytics/skills", {
    params: {
      search
    },
  });
  return data;
};