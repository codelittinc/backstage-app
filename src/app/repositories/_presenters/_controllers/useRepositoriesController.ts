import { useQuery } from "@tanstack/react-query";
import { REPOSITORIES_KEY } from "../../_domain/constants";
import { getRepositories } from "../_data/services/repositories";

const useRepositoriesController = () => {
  const { data, isLoading } = useQuery({
    queryKey: [REPOSITORIES_KEY],
    queryFn: () => getRepositories(),
  });

  return {
    repositories: data,
    isLoading: isLoading,
  };
};

export default useRepositoriesController;
