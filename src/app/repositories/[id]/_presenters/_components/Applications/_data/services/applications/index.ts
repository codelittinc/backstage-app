import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getRoadrunnerUrl } from "../../../../../../../../../api";
import { fromApiParser, toApiParser, ApiApplication } from "./parser";
import { Application } from "@/app/repositories/_domain/interfaces/Application";
import { APPLICATIONS_KEY } from "../../../_domain/constants";

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
