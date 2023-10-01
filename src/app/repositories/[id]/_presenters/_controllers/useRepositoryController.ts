import { useAppStore } from "@/app/_presenters/_data/store/store";
import { REPOSITORIES_KEY } from "@/app/repositories/_domain/constants";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import {
  getRepository,
  saveRepository,
} from "@/app/repositories/_presenters/_data/services/repositories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useRepositoryController = (repositoryId: string | number | undefined) => {
  const router = useRouter();
  const { showAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: saveRepository,
    onSuccess: (result) => {
      showAlert({
        color: "success",
        title: "Success!",
        content: `your changes have been saved!`,
      });
      queryClient.invalidateQueries({
        queryKey: ["repositories", result.id],
      });

      router.push(`/repositories/${result.id}`);
    },
    onError: (err) => {
      showAlert({
        color: "error",
        title: "Error!",
        content: `There was an error while saving. Error: ${JSON.stringify(
          err.response.data
        )}`,
        autoHideDuration: 10000,
      });
    },
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
