import { roadrunnerApiClient } from "@/app/_presenters/data/auth/roadrunnerApiAxios";

export const getCodeComments = async ({
  startDate,
  endDate,
  userId,
  projectId,
}: {
  endDate: string;
  projectId?: number;
  startDate: string;
  userId?: number;
}) => {
  const { data } = await roadrunnerApiClient.get("/code_comments.json", {
    params: {
      userId: userId,
      project_id: projectId,
      start_date: startDate,
      end_date: endDate,
    },
  });

  return data;
};
