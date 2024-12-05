import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { getSkillsAnalytics } from "@/app/_presenters/data/skills";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { getUsers } from "@/app/_presenters/data/users";
import { getUserSkills } from "@/app/_presenters/data/userSkills";

const useReportsController = () => {
  const params = useSearchParams();
  const authKey = params.get("authKey") as string;

  const { setProjectAuthKey, projectAuthKey } = useAppStore();
  const [query, setQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const {
    data: users,
    isLoading,
    refetch: usersRefetch,
  } = useQuery({
    queryKey: [tanstackKeys.Users, authKey],
    queryFn: () => getUsers(true, true, query),
    enabled: !!projectAuthKey,
    retry: false,
  });

  const { data: userSkills } = useQuery({
    queryKey: [tanstackKeys.UserSkills, selectedUser],
    queryFn: () => getUserSkills(selectedUser!),
    enabled: !!selectedUser,
    retry: false,
  });
  console.log(selectedUser);

  const { data: skillsAnalytics, refetch: skillsAnalyticsRefetch } = useQuery({
    queryKey: [tanstackKeys.analyics, authKey],
    queryFn: () => getSkillsAnalytics(query),
    enabled: !!projectAuthKey,
    retry: false,
  });

  const refetch = () => {
    usersRefetch();
    skillsAnalyticsRefetch();
  };

  const onSearch = () => {
    setSelectedUser(null);
    refetch();
  };

  const onExpand = (userId: string | null) => {
    setSelectedUser(userId);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch();
    }
  };

  useEffect(() => {
    if (authKey) {
      setProjectAuthKey(authKey as string);
    }
  }, [authKey]);

  const onChangeSearch = useCallback(debounce(refetch, 500), []);
  const filterSkillsAnalytics = () => {
    if (!skillsAnalytics) return [];

    return skillsAnalytics
      .map((skill) => {
        const hasAnyCount = skill.level.some((level) => level.count > 0);

        if (!hasAnyCount) return null;

        const filteredSkill = {
          ...skill,
          level: skill.level.filter((level) => level.count > 0),
        };

        return filteredSkill;
      })
      .filter((skill) => skill);
  };
  console.log(filterSkillsAnalytics());

  const buildSkillsAnalytics = () => {
    const chartColors = [
      "success",
      "info",
      "dark",
      "warning",
      "error",
      "secondary",
    ];
    const skillLevels = ["beginner", "intermediate", "advanced"];
    return {
      labels: filterSkillsAnalytics()?.map((skill) => skill.name),
      datasets: skillLevels.map((level, index) => ({
        label: level,
        color: chartColors[index],
        data: skillsAnalytics?.map((label) => {
          const skill = skillsAnalytics?.find((pr) => pr.name === label.name);
          const count = skill?.level.find((l) => l.name === level)?.count || 0;
          return count;
        }),
      })),
      formatter: (value: number) => {
        if (value === 0) return "";
        return value;
      },
    };
  };

  return {
    users,
    isLoading,
    query,
    setQuery,
    onSearch,
    userSkills,
    onExpand,
    selectedUser,
    onKeyPress,
    onChangeSearch,
    skillsAnalytics: buildSkillsAnalytics(),
  };
};

export default useReportsController;
