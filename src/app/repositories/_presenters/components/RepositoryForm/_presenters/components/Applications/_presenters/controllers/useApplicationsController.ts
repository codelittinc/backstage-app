import { useQuery } from "@tanstack/react-query";

import { APPLICATIONS_KEY } from "@/app/_domain/constants";
import { getApplications } from "@/app/repositories/_presenters/data/services/applications";

const useApplicationsController = (repositoryId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [APPLICATIONS_KEY, repositoryId],
    queryFn: () => getApplications(repositoryId),
  });

  return {
    applications: data,
    isLoading: isLoading,
  };
};

export default useApplicationsController;
