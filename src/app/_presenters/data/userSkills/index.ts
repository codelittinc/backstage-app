import { UserSkill } from '@/app/_domain/interfaces/Skill';

import { fromApiParser, toApiParser } from './parser';
import { backstageApiClient } from '../auth/backstageApiAxios';

export const getUserSkills = async (
  userId: number | string
): Promise<UserSkill[]> => {
  const { data } = await backstageApiClient.get(`/user_skills`, {
    params: { user_id: userId },
  });
  return data.map(fromApiParser);
};

export const updateUserSkills = async (
  userSkills: UserSkill[],
  userId: number | string
): Promise<UserSkill[]> => {
  const { data } = await backstageApiClient.patch(`/user_skills/bulk_update`, {
    params: { user_id: userId, user_skills: userSkills.map(toApiParser) },
  });

  return data.message;
};
