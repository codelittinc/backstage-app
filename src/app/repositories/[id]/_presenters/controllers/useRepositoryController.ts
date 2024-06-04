import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import {
  deleteRepository,
  getRepository,
} from "@/app/repositories/_presenters/data/services/repositories";
import { useRouter } from "next/navigation";
import routes from "@/routes";

const useRepositoryController = (repositoryId: string | number | undefined) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Repositories, repositoryId],
    queryFn: () => getRepository(repositoryId),
  });

  const { mutate } = useMutation({
    mutationFn: () => deleteRepository(repositoryId!),
    onSuccess: () => {
      queryClient.invalidateQueries([tanstackKeys.Repositories]);
      router.push(routes.repositoriesPath);
    },
  });

  return {
    repository: data,
    isLoading: isLoading,
    onDelete: mutate,
  };
};

export default useRepositoryController;
