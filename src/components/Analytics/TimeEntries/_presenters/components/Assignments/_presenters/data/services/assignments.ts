import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

export const ASSIGNMENTS_KEY = "assignments";

export const getAssignments = async ({
  projectId,
  startDate,
  endDate,
}: {
  endDate: string;
  projectId?: number;
  startDate: string;
}) => {
  const { data } = await backstageApiClient.get("/assignments.json", {
    params: {
      project_id: projectId,
      start_date: startDate,
      end_date: endDate,
    },
  });

  return data;
};
