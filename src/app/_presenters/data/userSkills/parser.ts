import { UserSkill } from "@/app/_domain/interfaces/Skill";

export const fromApiParser = (data: any): UserSkill => {
  return {
    id: data.id,
    skillId: data.skill.id,
    userId: data.user_id,
    yearsOfExperience: data.years_of_experience,
    lastAppliedYear: data.last_applied_in_year,
    level: data.level,
    skill: data.skill,
  };
};

export const toApiParser = (data: UserSkill): any => {
  return {
    skill_id: data.skillId,
    user_id: data.userId,
    years_of_experience: data.yearsOfExperience,
    last_applied_in_year: data.lastAppliedYear,
    level: data.level,
  };
};
