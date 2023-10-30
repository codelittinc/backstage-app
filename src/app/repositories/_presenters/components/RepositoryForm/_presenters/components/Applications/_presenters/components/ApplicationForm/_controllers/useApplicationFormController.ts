import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppStore } from "@/app/_presenters/data/store/store";
import { Application } from "@/app/repositories/_domain/interfaces/Application";

import {
  getApplication,
  saveApplication,
} from "../../../../_data/services/applications";
import { APPLICATIONS_KEY } from "../../../../_domain/constants";

const useApplicationsFormController = (
  repositoryId: number,
  applicationId: number | undefined
) => {
  const { showSaveSuccessAlert, showSaveErrorAlert } = useAppStore();
  const queryClient = useQueryClient();
  const saveMutation = useMutation(
    (application: Application) => saveApplication(repositoryId, application),
    {
      onSuccess: (result) => {
        queryClient.invalidateQueries([
          APPLICATIONS_KEY,
          repositoryId,
          result.id,
        ]);
        queryClient.invalidateQueries([APPLICATIONS_KEY, repositoryId]);
        showSaveSuccessAlert();
      },
      onError: (err) => showSaveErrorAlert(err),
    }
  );

  const { data: application } = useQuery({
    queryKey: [APPLICATIONS_KEY, repositoryId, applicationId],
    queryFn: () => {
      return getApplication(repositoryId, applicationId);
    },
  });

  return {
    onSave: (application: Application) => {
      saveMutation.mutate(application);
    },
    application: application,
  };
};

export default useApplicationsFormController;
