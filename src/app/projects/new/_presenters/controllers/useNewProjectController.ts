import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useAppStore } from "@/app/_presenters/data/store/store";
import { createProject } from "@/app/projects/_presenters/data/services/projects";
import routes from "@/routes";

const useNewProjectController = () => {
  const router = useRouter();
  const { showSaveSuccessAlert } = useAppStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: (result: Project) => {
      showSaveSuccessAlert();

      router.push(routes.projectPath(result.slug!));
    },
  });

  return {
    onSave: (project: Project) => {
      mutation.mutate(project);
    },
  };
};

export default useNewProjectController;
