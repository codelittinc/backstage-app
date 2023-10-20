import axios from "axios";
import { fromApiParser, toApiParser, ApiApplication } from "./parser";
import { Application } from "@/app/repositories/_domain/interfaces/Application";
import { roadrunnerApiClient } from "@/app/_presenters/data/auth/roadrunnerApiAxios";

export const getApplications = async (repositoryId: number) => {
  if (!repositoryId) return null;

  const { data } = await roadrunnerApiClient.get<ApiApplication[]>(
    `/repositories/${repositoryId}/applications.json`
  );
  return data.map(fromApiParser);
};

export const getApplication = async (
  repositoryId: number,
  applicationId?: number
) => {
  if (!repositoryId || !applicationId) return null;
  const { data } = await roadrunnerApiClient.get<ApiApplication>(
    `/repositories/${repositoryId}/applications/${applicationId}.json`
  );
  return fromApiParser(data);
};

export const saveApplication = async (
  repositoryId: number,
  application: Application
) => {
  const httpMethod = application.id
    ? roadrunnerApiClient.put
    : roadrunnerApiClient.post;
  const url = application.id
    ? `/repositories/${repositoryId}/applications/${application.id}.json`
    : `/repositories/${repositoryId}/applications.json`;
  const { data } = await httpMethod<ApiApplication>(url, {
    application: toApiParser(application),
  });
  return fromApiParser(data);
};

export const deleteApplication = async (
  repositoryId: number,
  applicationId: number
) => {
  await roadrunnerApiClient.delete(
    `/repositories/${repositoryId}/applications/${applicationId}.json`
  );
};
