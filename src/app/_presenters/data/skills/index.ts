import { Skill, SkillAnalytics } from "@/app/_domain/interfaces/Skill";

import { backstageApiClient } from "../auth/backstageApiAxios";

type APISkill = {
  id?: string;
  name: string;
  professional_area: string;
};

const fromAPISkill = (skill: APISkill): Skill => ({
  ...skill,
  professionArea: skill.professional_area,
});

const toAPISkill = (skill: Skill): APISkill => ({
  id: skill.id?.toString(),
  name: skill.name,
  professional_area: skill.professionArea,
});

export const getSkills = async (): Promise<Skill[] | null> => {
  const { data } = await backstageApiClient.get("/skills");
  return data.map((skill: APISkill) => fromAPISkill(skill));
};

export const createSkill = async (skill: Skill): Promise<Skill | null> => {
  const { data } = await backstageApiClient.post("/skills", toAPISkill(skill));
  return fromAPISkill(data);
};

export const getSkillsAnalytics = async (
  search: string
): Promise<SkillAnalytics[] | null> => {
  const { data } = await backstageApiClient.get("/analytics/skills", {
    params: {
      search,
    },
  });
  return data;
};
