import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

export const getIssues = async (
  project: Project,
  startDateFilter: string | undefined,
  endDateFilter: string | undefined
) => {
  const { data } = await backstageApiClient.get("/issues.json", {
    params: {
      project_id: project.id,
      start_date: startDateFilter,
      end_date: endDateFilter,
    },
  });

  return data;
};
