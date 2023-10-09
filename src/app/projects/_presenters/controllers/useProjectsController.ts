import { useQuery } from "@tanstack/react-query";
import { PROJETS_KEY } from "../../_domain/constants";
import { getProjects } from "../data/services/projects";
import { useSession } from "next-auth/react";

const useProjectsController = () => {
  const { data: session } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: [PROJETS_KEY],
    queryFn: () => getProjects(),
    //@TODO: find a way to remove this session validation
    enabled: !!session,
  });

  return {
    projects: data,
    isLoading: isLoading,
  };
};

export default useProjectsController;
