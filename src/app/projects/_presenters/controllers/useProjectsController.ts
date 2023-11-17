import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { PROJETS_KEY } from "../../_domain/constants";
import { getProjects } from "../data/services/projects";

const useProjectsController = () => {
  const { data, isLoading } = useQuery({
    queryKey: [PROJETS_KEY],
    queryFn: () => getProjects(),
  });

  return {
    projects: data,
    isLoading: isLoading,
  };
};

export default useProjectsController;
