import { useGetRepositories } from "@/api/repositories";

const useRepositoriesController = () => {
  const { data, isLoading } = useGetRepositories("");

  return {
    repositories: data,
    isLoading: isLoading,
  };
};

export default useRepositoriesController;
