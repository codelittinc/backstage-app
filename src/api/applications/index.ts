import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getRoadrunnerUrl } from "..";
import { fromApiParser, toApiParser, ApiApplication } from "./parser";

export const APPLICATIONS_KEY = "applications";

export interface Application {
  id?: number;
  environment: string;
  server?: Server;
  repositoryId: number;
  externalIdentifiers?: ExternalIdentifiers[];
}

export interface ExternalIdentifiers {
  id?: number;
  text: string;
}

export interface Server {
  id?: number;
  link: string;
  supportsHealthCheck: boolean;
  active: boolean;
}

export const getApplications = async (repositoryId: number) => {
  const { data } = await axios.get<ApiApplication[]>(
    getRoadrunnerUrl(`/repositories/${repositoryId}/applications.json`)
  );
  return data.map(fromApiParser);
};

export const getApplication = async (
  repositoryId: number,
  applicationId: number
) => {
  const { data } = await axios.get<ApiApplication>(
    getRoadrunnerUrl(
      `/repositories/${repositoryId}/applications/${applicationId}.json`
    )
  );
  return fromApiParser(data);
};

export const createApplication = async (
  repositoryId: number,
  application: Application
) => {
  const { data } = await axios.post<ApiApplication>(
    getRoadrunnerUrl(`/repositories/${repositoryId}/applications.json`),
    {
      application: toApiParser(application),
    }
  );
  return fromApiParser(data);
};

export const updateApplication = async (
  repositoryId: number,
  application: Application
) => {
  const { data } = await axios.patch<ApiApplication>(
    getRoadrunnerUrl(
      `/repositories/${repositoryId}/applications/${application.id}.json`
    ),
    {
      application: toApiParser(application),
    }
  );
  return fromApiParser(data);
};

export const deleteApplication = async (
  repositoryId: number,
  applicationId: number
) => {
  await axios.delete(
    getRoadrunnerUrl(
      `/repositories/${repositoryId}/applications/${applicationId}.json`
    )
  );
};

export function useGetApplications(repositoryId: number) {
  return useQuery({
    queryKey: [APPLICATIONS_KEY, repositoryId],
    queryFn: () => getApplications(repositoryId),
  });
}

export function useGetApplication(repositoryId: number, applicationId: number) {
  return useQuery({
    queryKey: [APPLICATIONS_KEY, repositoryId, applicationId],
    queryFn: () => getApplication(repositoryId, applicationId),
  });
}
