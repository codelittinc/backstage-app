import { useQuery } from "@tanstack/react-query";

import { REPOSITORIES_KEY } from "@/app/repositories/_domain/constants";
import { getRepository } from "@/app/repositories/_presenters/data/services/repositories";

const useRepositoryController = (repositoryId: string | number | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: [REPOSITORIES_KEY, repositoryId],
    queryFn: () => getRepository(repositoryId),
  });

  return {
    repository: data,
    isLoading: isLoading,
  };
};

export default useRepositoryController;
