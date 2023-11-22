import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

export const getTimeEntriesAnalytics = async (
  startDate: string,
  endDate: string,
  projectId: number | undefined
) => {
  const { data } = await backstageApiClient.get(
    `/analytics/time_entries.json`,
    {
      params: {
        project_id: projectId,
        start_date: startDate,
        end_date: endDate,
      },
    }
  );
  return data;
};
