import { useAppStore } from "@/app/_presenters/data/store/store";
import { PROJETS_KEY } from "@/app/projects/_domain/constants";
import {
  getProject,
  updateProject,
} from "@/app/projects/_presenters/data/services/projects";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useProjectController = (projectId: number) => {
  const { showSaveSuccessAlert, showSaveErrorAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProject,
    onSuccess: (result: Project) => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [PROJETS_KEY, result.id],
      });
    },
    onError: (err: any) => showSaveErrorAlert(err),
  });

  const { data, isLoading } = useQuery({
    queryKey: [PROJETS_KEY, projectId],
    queryFn: () => getProject(projectId),
  });

  return {
    onSave: (project: Project) => {
      mutation.mutate(project);
    },
    project: data,
    isLoading: isLoading || !data,
  };
};

export default useProjectController;
