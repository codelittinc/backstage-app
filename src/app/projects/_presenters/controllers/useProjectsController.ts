import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { PROJETS_KEY } from "../../_domain/constants";
import { getProjects } from "../data/services/projects";

const useProjectsController = (activeOnly: boolean) => {
  const { data, isLoading } = useQuery({
    queryKey: [PROJETS_KEY, activeOnly],
    queryFn: () => getProjects(activeOnly),
  });

  return {
    projects: data,
    isLoading: isLoading,
  };
};

export default useProjectsController;
