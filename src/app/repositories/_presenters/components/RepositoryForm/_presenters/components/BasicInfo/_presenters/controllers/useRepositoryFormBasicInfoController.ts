import useProjectsController from "@/app/projects/_presenters/controllers/useProjectsController";

import useChannelsController from "./useChannelsController";

const useRepositoryFormBasicInfoController = (customer: Customer | null) => {
  const { channels, isLoading: isChannelsLoading } =
    useChannelsController(customer);

  const { projects, isLoading: isProjectsLoading } = useProjectsController();

  return {
    channels: channels,
    projects: projects,
    isLoading: isChannelsLoading || isProjectsLoading,
  };
};

export default useRepositoryFormBasicInfoController;
