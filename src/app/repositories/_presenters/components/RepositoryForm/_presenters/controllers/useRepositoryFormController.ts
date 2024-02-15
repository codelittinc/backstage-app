import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import { saveRepository } from "@/app/repositories/_presenters/data/services/repositories";
import routes from "@/routes";

const useRepositoryController = () => {
  const router = useRouter();
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: saveRepository,
    onSuccess: (result) => {
      showSaveSuccessAlert();

      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Repositories, result.id],
      });

      router.push(routes.repositoryPath(result.id!));
    },
  });

  return {
    onSave: (repository: Repository) => {
      mutation.mutate(repository);
    },
  };
};

export default useRepositoryController;
