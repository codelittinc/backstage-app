import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

export const getProjectProgressAnalytics = async (
  projectId: number | string,
  statementOfWorkId: number
) => {
  const { data } = await backstageApiClient.get(
    `/analytics/project_progress.json`,
    {
      params: {
        statement_of_work_id: statementOfWorkId,
        project_id: projectId,
      },
    }
  );

  return {
    contractHours: data.contract_hours,
    consumedHours: data.consumed_hours,
  };
};
