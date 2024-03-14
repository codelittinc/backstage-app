import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

export const getTimeEntriesAnalytics = async (
  startDate: string,
  endDate: string,
  projectId?: number,
  statementOfWorkId?: number
) => {
  const { data } = await backstageApiClient.get(
    `/analytics/time_entries.json`,
    {
      params: {
        statement_of_work_id: statementOfWorkId,
        project_id: projectId,
        start_date: startDate,
        end_date: endDate,
      },
    }
  );
  return data;
};
