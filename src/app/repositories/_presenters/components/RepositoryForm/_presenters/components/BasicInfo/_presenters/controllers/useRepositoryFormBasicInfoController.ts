import useProjectsController from "@/app/projects/_presenters/controllers/useProjectsController";

import useChannelsController from "./useChannelsController";

const useRepositoryFormBasicInfoController = (
  projectId: number | undefined
) => {
  const { projects } = useProjectsController();

  const finaltProjectId = projectId || projects?.[0]?.id;

  const customer = projects?.find(
    (p: Project) => p.id === finaltProjectId
  )?.customer;

  const { channels } = useChannelsController(customer);

  return {
    channels: channels || [],
    projects: projects || [],
  };
};

export default useRepositoryFormBasicInfoController;
