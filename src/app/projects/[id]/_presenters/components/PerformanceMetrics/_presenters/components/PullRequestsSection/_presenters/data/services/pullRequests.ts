import { roadrunnerApiClient } from "@/app/_presenters/data/auth/roadrunnerApiAxios";

export const getPullRequests = async ({
  userId,
  state,
  projectId,
  startDate,
  endDate,
}: {
  endDate: string;
  projectId?: number;
  startDate: string;
  state?: string;
  userId?: number | string;
}) => {
  const { data } = await roadrunnerApiClient.get("/pull_requests.json", {
    params: {
      user_id: userId,
      state: state,
      project_id: projectId,
      start_date: startDate,
      end_date: endDate,
    },
  });

  return data;
};
