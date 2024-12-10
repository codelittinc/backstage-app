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
  const [professionAreas, setProfessionAreas] = useState<string[]>([
    "engineering",
    "design",
  ]);

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
      .filter((skill) =>
        professionAreas.includes(skill.professional_area?.toLowerCase())
      )
      .map((skill) => {
        const hasAnyCount = skill.level.some((level) => level.count > 0);

        if (!hasAnyCount) return null;

        const filteredSkill = {
          ...skill,
          level: skill.level.filter((level) => level.count > 0),
        };

        return filteredSkill;
      })
      .filter((skill) => skill)
      .sort((a, b) => a.name.localeCompare(b.name));
  };

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
        data: filterSkillsAnalytics()?.map((label) => {
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

  const toggleProfessionArea = (area: string) => {
    setProfessionAreas((prev) => {
      if (prev.includes(area)) {
        if (prev.length === 1) return prev;
        return prev.filter((a) => a !== area);
      }
      return [...prev, area];
    });
  };

  const buildPieChartData = () => {
    if (!skillsAnalytics) return null;

    // Sum up all levels for each skill
    const skillTotals = skillsAnalytics
      .filter((skill) =>
        professionAreas.includes(skill.professional_area.toLowerCase())
      )
      .map((skill) => ({
        name: skill.name,
        total: skill.level.reduce((sum, level) => sum + level.count, 0),
      }))
      .sort((a, b) => b.total - a.total) // Sort by total descending
      .slice(0, 5); // Get top 5

    return {
      labels: skillTotals.map((skill) => skill.name),
      datasets: {
        label: "Top Skills",
        data: skillTotals.map((skill) => skill.total),
        backgroundColors: ["info", "primary", "dark", "secondary", "warning"],
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
    professionAreas,
    toggleProfessionArea,
    topSkillsPieChart: buildPieChartData(),
  };
};

export default useReportsController;
