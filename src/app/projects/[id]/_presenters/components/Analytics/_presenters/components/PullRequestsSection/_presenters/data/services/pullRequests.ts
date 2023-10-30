import { roadrunnerApiClient } from "@/app/_presenters/data/auth/roadrunnerApiAxios";

export const getPullRequests = async ({
  userId,
  state = "merged",
  projectId,
  startDate,
  endDate,
}: {
  endDate: string;
  projectId?: number;
  startDate: string;
  state: string;
  userId?: number;
}) => {
  const { data } = await roadrunnerApiClient.get("/pull_requests.json", {
    params: {
      userId: userId,
      state: state,
      project_id: projectId,
      start_date: startDate,
      end_date: endDate,
    },
  });

  return data;
};
