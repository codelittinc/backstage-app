import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";

import { getProjects } from "../data/services/projects";

const useProjectsController = (startDate?: string, endDate?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Projects, startDate, endDate],
    queryFn: () => getProjects(startDate, endDate),
  });

  return {
    projects: data,
    isLoading: isLoading,
  };
};

export default useProjectsController;
