import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { getRepository } from "@/app/repositories/_presenters/data/services/repositories";

const useRepositoryController = (repositoryId: string | number | undefined) => {
  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Repositories, repositoryId],
    queryFn: () => getRepository(repositoryId),
  });

  return {
    repository: data,
    isLoading: isLoading,
  };
};

export default useRepositoryController;
