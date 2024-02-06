import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useAppStore } from "@/app/_presenters/data/store/store";
import { PROJETS_KEY } from "@/app/projects/_domain/constants";
import {
  getProject,
  updateProject,
} from "@/app/projects/_presenters/data/services/projects";
import routes from "@/routes";

const useUpdateProjectController = (projectId: number | string) => {
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: updateProject,
    onSuccess: (result: Project) => {
      showSaveSuccessAlert();
      queryClient.invalidateQueries({
        queryKey: [PROJETS_KEY, result.id],
      });

      router.push(routes.projectPath(result.slug!));
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

export default useUpdateProjectController;
