import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplication } from "../../../../_data/services/applications";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";
import { APPLICATIONS_KEY } from "../../../../_domain/constants";
import { useAppStore } from "@/app/_presenters/_data/store/store";

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
