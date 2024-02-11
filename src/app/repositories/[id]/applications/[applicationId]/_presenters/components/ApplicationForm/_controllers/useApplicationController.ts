import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { APPLICATIONS_KEY } from "@/app/_domain/constants";
import { useAppStore } from "@/app/_presenters/data/store/store";
import { Application } from "@/app/repositories/_domain/interfaces/Application";
import {
  getApplication,
  saveApplication,
} from "@/app/repositories/_presenters/data/services/applications";
import routes from "@/routes";

const useApplication = (
  repositoryId: number,
  applicationId: number | undefined
) => {
  const { showSaveSuccessAlert, showSaveErrorAlert } = useAppStore();
  const queryClient = useQueryClient();
  const router = useRouter();
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
        router.push(routes.applicationPath(result.id as number, repositoryId));
      },
      onError: (err) => showSaveErrorAlert(err),
    }
  );

  const { data: application, isLoading } = useQuery({
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
    isLoading,
  };
};

export default useApplication;
