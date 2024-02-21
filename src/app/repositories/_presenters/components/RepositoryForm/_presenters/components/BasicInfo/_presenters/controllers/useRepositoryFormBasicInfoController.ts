import useProjectsController from "@/app/projects/_presenters/controllers/useProjectsController";

import useChannelsController from "./useChannelsController";

const useRepositoryFormBasicInfoController = (
  projectId: number | undefined
) => {
  const { projects, isLoading: isProjectsLoading } = useProjectsController();

  const finaltProjectId = projectId || projects?.[0]?.id;

  const customer = projects?.find(
    (p: Project) => p.id === finaltProjectId
  )?.customer;

  const { channels, isLoading: isChannelsLoading } =
    useChannelsController(customer);

  return {
    channels: channels,
    projects: projects,
    isLoading: isChannelsLoading || isProjectsLoading,
  };
};

export default useRepositoryFormBasicInfoController;
