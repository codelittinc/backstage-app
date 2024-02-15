import { useQuery } from "@tanstack/react-query";

import tanstackKeys from "@/app/_domain/enums/tanstackKeys";
import { getApplications } from "@/app/repositories/_presenters/data/services/applications";

const useApplicationsController = (repositoryId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [tanstackKeys.Applications, repositoryId],
    queryFn: () => getApplications(repositoryId),
  });

  return {
    applications: data,
    isLoading: isLoading,
  };
};

export default useApplicationsController;
