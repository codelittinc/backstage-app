import { useQuery } from "@tanstack/react-query";
import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { getSkills } from "../data/services/skills";

const useSkillsController = () => {
  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Skills],
    queryFn: () => getSkills(),
  });

  return {
    skills: data,
    isLoading: isLoading,
  };
};

export default useSkillsController;
