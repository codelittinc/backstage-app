import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

import { ApiProjectFrom, fromApiParser, toApiParser } from "./parser";

export const getProjects = async (startDate?: string, endDate?: string) => {
  const { data } = await backstageApiClient.get("/projects.json", {
    params: {
      filters: {
        start_date: startDate,
        end_date: endDate,
      },
    },
  });

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

export const deleteProject = async (project: Project) => {
  await backstageApiClient.delete(`/projects/${project.id}.json`);
};
