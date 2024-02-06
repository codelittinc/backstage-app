import useProjectsController from "@/app/projects/_presenters/controllers/useProjectsController";

import useChannelsController from "./useChannelsController";

const useRepositoryFormBasicInfoController = (
  customer: Customer | undefined
) => {
  const { channels, isLoading: isChannelsLoading } =
    useChannelsController(customer);

  const { projects, isLoading: isProjectsLoading } =
    useProjectsController(false);

  return {
    channels: channels,
    projects: projects,
    isLoading: isChannelsLoading || isProjectsLoading,
  };
};

export default useRepositoryFormBasicInfoController;
