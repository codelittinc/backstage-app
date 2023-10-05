import { useAppStore } from "@/app/_presenters/_data/store/store";
import { REPOSITORIES_KEY } from "@/app/repositories/_domain/constants";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import {
  getRepository,
  saveRepository,
} from "@/app/repositories/_presenters/_data/services/repositories";
import routes from "@/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useRepositoryController = (repositoryId: string | number | undefined) => {
  const router = useRouter();
  const { showSaveSuccessAlert, showSaveErrorAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: saveRepository,
    onSuccess: (result) => {
      showSaveSuccessAlert();

      queryClient.invalidateQueries({
        queryKey: [REPOSITORIES_KEY, result.id],
      });

      router.push(routes.repositoryPath(result.id!));
    },
    onError: (err) => showSaveErrorAlert(err),
  });

  const { data, isLoading } = useQuery({
    queryKey: [REPOSITORIES_KEY, repositoryId],
    queryFn: () => getRepository(repositoryId),
  });

  return {
    onSave: (repository: Repository) => {
      mutation.mutate(repository);
    },
    repository: data,
    isLoading: isLoading,
  };
};

export default useRepositoryController;
