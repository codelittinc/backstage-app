import { useQuery } from "@tanstack/react-query";
import { REPOSITORIES_KEY } from "../../_domain/constants";
import { getRepositories } from "../_data/services/repositories";

const useRepositoriesController = () => {
  const { data } = useQuery({
    queryKey: [REPOSITORIES_KEY],
    queryFn: () => getRepositories(),
  });

  return {
    repositories: data,
  };
};

export default useRepositoriesController;
