import { Application } from "@/app/repositories/_domain/interfaces/Application";
import { useAppStore } from "@/app/_presenters/_data/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createApplication,
  updateApplication,
} from "../../../_data/services/applications";
import { APPLICATIONS_KEY } from "../../../_domain/constants";

const useApplicationsFormController = (repositoryId: number) => {
  const { showAlert } = useAppStore();
  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (application: Application) => createApplication(repositoryId, application),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([APPLICATIONS_KEY, repositoryId]);
        showAlert({
          color: "success",
          title: "Success!",
          content: "your application has been created!",
        });
      },
    }
  );

  const updateMutation = useMutation(
    (application: Application) => updateApplication(repositoryId, application),
    {
      onSuccess: (result) => {
        queryClient.invalidateQueries([APPLICATIONS_KEY, repositoryId]);
        queryClient.invalidateQueries([
          APPLICATIONS_KEY,
          repositoryId,
          result.id,
        ]);

        showAlert({
          color: "success",
          title: "Success!",
          content: "your application has been updated!",
        });
      },
    }
  );

  return {
    onSave: (application: Application) => {
      application.id
        ? updateMutation.mutate(application)
        : createMutation.mutate(application);
    },
  };
};

export default useApplicationsFormController;
