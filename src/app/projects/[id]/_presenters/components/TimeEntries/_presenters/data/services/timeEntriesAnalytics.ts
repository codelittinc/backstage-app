import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

export const getTimeEntriesAnalytics = async (
  statementOfWorkId: number,
  startDate,
  endDate
) => {
  const { data } = await backstageApiClient.get(
    `/analytics/time_entries.json`,
    {
      params: {
        statement_of_work_id: statementOfWorkId,
        start_date: startDate,
        end_date: endDate,
      },
    }
  );
  return data;
};
