import { ApiProjectFrom, fromApiParser, toApiParser } from "./parser";
import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

export const getProjects = async () => {
  const { data } = await backstageApiClient.get("/projects.json");
  return data.map(fromApiParser);
};

export const getProject = async (id: number | string) => {
  const { data } = await backstageApiClient.get(`/projects/${id}.json`);
  return fromApiParser(data);
};

export const createProject = async (project: Project): Promise<Project> => {
  const { data } = await backstageApiClient.post<ApiProjectFrom>(
    `/projects.json`,
    {
      project: toApiParser(project),
    }
  );

  return fromApiParser(data);
};

export const updateProject = async (project: Project): Promise<Project> => {
  const { data } = await backstageApiClient.put<Project>(
    `/projects/${project.id}.json`,
    {
      project: toApiParser(project),
    }
  );

  return fromApiParser(data);
};
