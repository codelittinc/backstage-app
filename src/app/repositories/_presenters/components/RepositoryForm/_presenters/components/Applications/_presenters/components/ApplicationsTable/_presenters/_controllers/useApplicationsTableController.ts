import { useMutation, useQueryClient } from "@tanstack/react-query";

import { APPLICATIONS_KEY } from "@/app/_domain/constants";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import { deleteApplication } from "@/app/repositories/_presenters/data/services/applications";

interface Props {
  repository: Repository;
}
const useApplicationsTableController = ({ repository }: Props) => {
  const queryClient = useQueryClient();
  const { showSaveSuccessAlert } = useAppStore();
  const deleteMutation = useMutation(
    (applicationId: number) => deleteApplication(repository.id!, applicationId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([APPLICATIONS_KEY, repository.id]);
        queryClient.invalidateQueries([APPLICATIONS_KEY, repository.id]);
        showSaveSuccessAlert();
      },
    }
  );

  return {
    onDelete: (applicationId: number) => {
      deleteMutation.mutate(applicationId);
    },
  };
};

export default useApplicationsTableController;
