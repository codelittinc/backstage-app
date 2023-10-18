import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

export const getIssues = async (project: Project) => {
  const { data } = await backstageApiClient.get("/issues.json", {
    params: {
      project_id: project.id,
    },
  });

  return data;
};
