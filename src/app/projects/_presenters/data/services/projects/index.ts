import { backstageApiClient } from "@/app/_presenters/data/auth/backstageApiAxios";

import { ApiProjectFrom, fromApiParser, toApiParser } from "./parser";

export const getProjects = async (activeOnly: boolean) => {
  const { data } = await backstageApiClient.get("/projects.json", {
    params: {
      filters: {
        active_only: activeOnly,
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
