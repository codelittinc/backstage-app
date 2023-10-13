import useChannelsController from "./useChannelsController";
import useProjectsController from "@/app/projects/_presenters/controllers/useProjectsController";

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
