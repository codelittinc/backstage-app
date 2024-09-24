import { useMutation, useQuery } from '@tanstack/react-query';

import tanstackKeys from '@/app/_domain/enums/tanstackKeys';
import { UserSkill } from '@/app/_domain/interfaces/Skill';
import { useAppStore } from '@/app/_presenters/data/store/store';
import {
  getUserSkills,
  updateUserSkills,
} from '@/app/_presenters/data/userSkills';

const useUserSkillsController = (id: number | string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [tanstackKeys.UserSkills],
    queryFn: () => {
      return getUserSkills(id);
    },
  });

  const { showSaveSuccessAlert } = useAppStore();

  const mutation = useMutation({
    mutationFn: ({
      userSkills,
      userId,
    }: {
      userId: number | string;
      userSkills: UserSkill[];
    }) => updateUserSkills(userSkills, userId),
    onSuccess: () => {
      showSaveSuccessAlert();
    },
  });

  return {
    isLoading,
    userSkills: data || [],
    onSave: (userSkills: UserSkill[], userId: number | string) => {
      mutation.mutate({ userSkills, userId });
    },
  };
};

export default useUserSkillsController;
