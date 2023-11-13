import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

export const getFinancesAnalytics = async (
  startDate: string,
  endDate: string,
  projectId: number | undefined
) => {
  const { data } = await backstageApiClient.get(`/analytics/finances.json`, {
    params: {
      project_id: projectId,
      start_date: startDate,
      end_date: endDate,
    },
  });

  return data;
};
