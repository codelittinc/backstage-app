import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

export const REQUIREMENTS_KEY = "requirements";

export const getRequirements = async ({
  projectId,
  startDate,
  endDate,
}: {
  endDate: string;
  projectId?: number;
  startDate: string;
}) => {
  const { data } = await backstageApiClient.get("/requirements.json", {
    params: {
      project_id: projectId,
      start_date: startDate,
      end_date: endDate,
    },
  });

  return data;
};
