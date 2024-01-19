import { roadrunnerApiClient } from "@/app/_presenters/data/auth/roadrunnerApiAxios";

export const CODE_COMMENTS_KEY = "code_comments";

export const getCodeComments = async ({
  startDate,
  endDate,
  userId,
  projectId,
}: {
  endDate: string;
  startDate: string;
  userId?: number;
  projectId?: number;
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
