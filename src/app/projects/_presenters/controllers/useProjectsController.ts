import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";

import { getProjects } from "../data/services/projects";

const useProjectsController = (activeOnly: boolean) => {
  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Projects, activeOnly],
    queryFn: () => getProjects(activeOnly),
  });

  return {
    projects: data,
    isLoading: isLoading,
  };
};

export default useProjectsController;
