import { useQuery } from "@tanstack/react-query";

import usePermissions from "@/components/ProtectedComponent/_presenters/controllers/usePermissionsController";
import { abilities, targets } from "@/permissions";

import { getFinancesAnalytics } from "../data/services/finances";

const useTimeEntriesController = (
  startDate: string,
  endDate: string,
  project?: Project
) => {
  const { hasPermission } = usePermissions({
    ability: abilities.view,
    target: targets.finances,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "finances", project?.id, startDate, endDate],
    queryFn: () => getFinancesAnalytics(startDate, endDate, project?.id),
    enabled: hasPermission,
  });

  return {
    hasPermission,
    finances: data,
    isLoading,
  };
};

export default useTimeEntriesController;
