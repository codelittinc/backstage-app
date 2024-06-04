import { roadrunnerApiClient } from "@/app/_presenters/data/auth/roadrunnerApiAxios";
import { Repository } from "@/app/repositories/_domain/interfaces/Repository";

import { fromApiParser, toApiParser } from "./parser";

export const getRepositories = async () => {
  const { data } = await roadrunnerApiClient.get("/repositories.json");

  return data.map(fromApiParser);
};

export const saveRepository = async (params: Repository) => {
  const { id = "" } = params;

  var result = null;
  if (id) {
    result = await roadrunnerApiClient.put(`/repositories/${id}.json`, {
      repository: toApiParser(params),
    });
  } else {
    result = await roadrunnerApiClient.post(`/repositories.json`, {
      repository: toApiParser(params),
    });
  }

  const { data } = result;
  return fromApiParser(data);
};

export const getRepository = async (id: number | undefined | string) => {
  if (!id) {
    return null;
  }
  const { data } = await roadrunnerApiClient.get(`/repositories/${id}.json`);

  return fromApiParser(data);
};

export const deleteRepository = async (id: number | string) => {
  if (!id) {
    return null;
  }

  const result = await roadrunnerApiClient.delete(`/repositories/${id}.json`);
  return result.status === 204;
};
