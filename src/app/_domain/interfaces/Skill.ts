import skillLevelKeys from '../enums/skillLevelKeys';

export type Skill = {
  id?: string | number;
  name: string;
};

export type UserSkill = {
  id?: number;
  lastAppliedYear: number;
  level: skillLevelKeys;
  skill: Skill;
  skillId?: string | number;
  userId?: number;
  yearsOfExperience: number;
};

export type ApiUserSkill = {
  id?: number;
  last_applied_in_year: number;
  level: skillLevelKeys;
  skill_id?: number;
  user_id?: number;
  years_of_experience: number;
};

export type SkillAnalytics = {
  level: {
    count: number;
    name: string;
  }[],
  name: string;
};
