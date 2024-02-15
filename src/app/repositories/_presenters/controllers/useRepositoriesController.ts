import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";

import { getRepositories } from "../data/services/repositories";

const useRepositoriesController = () => {
  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Repositories],
    queryFn: getRepositories,
  });

  return {
    repositories: data,
    isLoading: isLoading,
  };
};

export default useRepositoriesController;
