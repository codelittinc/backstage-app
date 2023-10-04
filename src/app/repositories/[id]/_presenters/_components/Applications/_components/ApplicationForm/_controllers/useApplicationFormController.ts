import { Application } from "@/app/repositories/_domain/interfaces/Application";
import { useAppStore } from "@/app/_presenters/_data/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createApplication,
  getApplication,
  getApplications,
  updateApplication,
} from "../../../_data/services/applications";
import { APPLICATIONS_KEY } from "../../../_domain/constants";

const useApplicationsFormController = (
  repositoryId: number,
  applicationId: number | undefined
) => {
  const { showAlert } = useAppStore();
  const queryClient = useQueryClient();
  const createMutation = useMutation(
    (application: Application) => createApplication(repositoryId, application),
    {
      onSuccess: (result) => {
        queryClient.invalidateQueries([
          APPLICATIONS_KEY,
          repositoryId,
          result.id,
        ]);
        showAlert({
          color: "success",
          title: "Success!",
          content: "your application has been created!",
        });
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
      application.id
        ? updateMutation.mutate(application)
        : createMutation.mutate(application);
    },
    application: application,
  };
};

export default useApplicationsFormController;
