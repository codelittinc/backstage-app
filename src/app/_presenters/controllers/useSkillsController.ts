"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import skillLevelKeys from "@/app/_domain/enums/skillLevelKeys";
import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { UserSkill } from "@/app/_domain/interfaces/Skill";

import { getSkills } from "../data/skills";
import { useAppStore } from "../data/store/store";
import { getUserSkills, updateUserSkills } from "../data/userSkills";

const defaultUserSkill: UserSkill = {
  lastAppliedYear: 2010,
  level: skillLevelKeys.Beginner,
  yearsOfExperience: 0,
  skillId: undefined,
  userId: undefined,
};

const useSkillsController = (id: number | string) => {
  const queryClient = useQueryClient();
  const { data: skills, isLoading: skillsLoading } = useQuery({
    queryKey: [tanstackKeys.Skills],
    queryFn: getSkills,
  });

  const { data: userSkills, isLoading: userSkillsLoading } = useQuery({
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
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.UserSkills],
      });
      showSaveSuccessAlert();
    },
  });

  const { control, handleSubmit, reset } = useForm<{ userSkills: UserSkill[] }>(
    {
      defaultValues: {
        userSkills: [defaultUserSkill],
      },
    }
  );

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'userSkills',
  });

  const onSubmit = (data: { userSkills: UserSkill[] }) => {
    mutation.mutate({ userSkills: data.userSkills || [], userId: id });
  };

  const addNewSkillForm = () => {
    append(defaultUserSkill);
  };

  useEffect(() => {
    if (userSkills?.length) {
      reset({ userSkills });
      replace(userSkills);
    }
  }, [userSkills, replace, reset]);

  return {
    skills,
    userSkills,
    isLoading: skillsLoading || userSkillsLoading,
    addNewSkillForm,
    onSubmit,
    handleSubmit,
    fields,
    remove,
    control
  };
};

export default useSkillsController;
