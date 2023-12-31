import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAppStore } from "@/app/_presenters/data/store/store";
import { PROJETS_KEY } from "@/app/projects/_domain/constants";
import {
  getProject,
  updateProject,
} from "@/app/projects/_presenters/data/services/projects";

const useProjectController = (projectId: number | string) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProject,
    onSuccess: (result: Project) => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [PROJETS_KEY, result.id],
      });
    },
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
